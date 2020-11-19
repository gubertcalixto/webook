import { Component, ElementRef, Injector, ViewEncapsulation } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-image-element',
  templateUrl: './editor-image-element.component.html',
  styleUrls: ['./editor-image-element.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorImageElementComponent extends EditorResizeBaseElement {
  private readonly defaultImage = '/assets/editor/undraw_photo.svg';
  public elementTypeId = 'wb-image';
  public image?: string;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    injector: Injector
  ) {
    super(elementRef, injector);
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    const height = this.frame.get('height');
    let hasAlteredSize = false;
    if (this.data?.image) {
      if (width === undefined || width === null || width === 'unset'
        && height === undefined || height === null || height === 'unset') {
        this.getImageDimensions(this.data.image).then(dimensions => {
          this.frame.set('width', `${dimensions?.width || 200 }px`);
          this.frame.set('height', `${dimensions?.height || 200 }px`);
          hasAlteredSize = true;
        });
      }
    } else {
      if (width === undefined || width === null || width === 'unset') {
        this.frame.set('width', '200px');
        hasAlteredSize = true;
      }
      if (height === undefined || height === null || height === 'unset') {
        this.frame.set('height', '200px');
        hasAlteredSize = true;
      }
    }
    if (hasAlteredSize) {
      this.updateFrame();
    }
  }

  protected setData(): void {
    if (!this.data.image) {
      this.data.image = this.defaultImage;
    }
    if (this.image !== this.data.image) {
      this.image = this.data.image;
    }
  }

  private getImageDimensions(base64Image: string): Promise<{ width: number; height: number; }> {
    return new Promise((resolved, rejected) => {
      var i = new Image()
      i.onload = () => {
        resolved({ width: i.width, height: i.height })
      };
      i.src = base64Image
    })
  }
}
