import { Component, ElementRef, Injector } from '@angular/core';
import { PixabayHit, PixabayResult, TccPixabayService } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-pixabay-element',
  templateUrl: './editor-pixabay-element.component.html',
  styleUrls: ['./editor-pixabay-element.component.scss']
})
export class EditorPixabayElementComponent extends EditorResizeBaseElement {
  public readonly defaultImage = '/assets/editor/undraw_photo.svg';
  public elementTypeId = 'wb-pixabay';
  public id: string;
  public isLoading = true;
  public currentPixabayHit: PixabayHit;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    injector: Injector,
    private pixabayService: TccPixabayService
  ) {
    super(elementRef, injector);
  }

  private getPixabayImage(imageId: string): Observable<any> {
    this.isLoading = true;
    return this.pixabayService
      .getById(imageId)
      .pipe(tap((res: PixabayResult) => {
        if (res?.hits?.length === 1) {
          this.currentPixabayHit = res.hits[0];
        }
        this.isLoading = false;
      }));
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
    if (this.id !== this.data.pixabayId) {
      this.id = this.data.pixabayId;
      if (this.id) {
        this.getPixabayImage(this.id).pipe(first()).subscribe();
      }
    } else if (!this.data.pixabayId) {
      this.isLoading = false;
    }
  }
}
