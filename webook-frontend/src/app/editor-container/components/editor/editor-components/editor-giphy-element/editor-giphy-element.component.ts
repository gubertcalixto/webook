import { Component, ElementRef } from '@angular/core';
import { TccGiphyService } from 'projects/legacy-projects/tcc-giphy/src/public-api';
import { first } from 'rxjs/operators';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-giphy-element',
  templateUrl: './editor-giphy-element.component.html',
  styleUrls: ['./editor-giphy-element.component.scss'],
})
export class EditorGiphyElementComponent extends EditorResizeBaseElement {
  public elementTypeId = 'wb-giphy';
  public id: string;
  public isLoading = true;
  public imageAuthor: string;
  public imageUrl: string;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private service: TccGiphyService
  ) {
    super(elementRef);
  }

  public getGif(itemId: string): void {
    if (!itemId) {
      return;
    }
    this.isLoading = true;
    this.service.getById(itemId)
      .pipe(first())
      .subscribe((res: any) => {
        if (res?.data.id) {
          const item = res?.data;
          this.imageAuthor = 'Imagem de' + (item.user?.display_name + ' | @' + item.username);
          this.imageUrl = item.images?.fixed_width?.url;
        }
        this.isLoading = false;
      });
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    const height = this.frame.get('height');
    let hasAlteredSize = false;
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      hasAlteredSize = true;
    }
    if (height === undefined || height === null || height === 'unset') {
      this.frame.set('height', '200px');
      hasAlteredSize = true;
    }
    if (hasAlteredSize) {
      this.updateFrame();
    }
  }

  protected setData(): void {
    if (this.id !== this.data.giphyId) {
      this.id = this.data.giphyId;
      if (this.id) {
        this.getGif(this.id);
      }
    } else if (!this.data.giphyId) {
      this.isLoading = false;
    }
  }
}
