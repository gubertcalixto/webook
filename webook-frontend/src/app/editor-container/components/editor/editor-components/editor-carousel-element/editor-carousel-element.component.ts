import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

interface ICarouselOptions {
  autoplay: boolean;
  speed: number;
  effect: 'scrollx' | 'fade';
  position: 'top' | 'bottom' | 'left' | 'right';
}

@Component({
  selector: 'wb-editor-carousel-element',
  templateUrl: './editor-carousel-element.component.html',
  styleUrls: ['./editor-carousel-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorCarouselElementComponent extends EditorResizeBaseElement {
  public elementTypeId = 'wb-carousel';
  public carouselOptions: ICarouselOptions;
  public carouselFotos: any[];
  public isResizingCarousel = false;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    const height = this.frame.get('height');
    let hasAlteredSize = false;
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '250px');
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
    if (JSON.stringify(this.carouselFotos) !== JSON.stringify(this.data.pixabayImages)) {
      this.carouselFotos = this.data.pixabayImages || [];
    }
    if (this.data.effect || 'fade' !== this.carouselOptions.effect) {
      this.isResizingCarousel = true;
      setTimeout(() => {
        this.isResizingCarousel = false;
      });
    }
    this.carouselOptions = {
      autoplay: typeof this.data.autoplay === 'boolean' ? this.data.autoplay : true,
      speed: this.data.speed || 1000,
      effect: this.data.effect || 'fade',
      position: this.data.position || 'top'
    }
  }

  public onResizeStart(event: any): void {
    super.onResizeStart(event);
    this.isResizingCarousel = true;
  }
  public onResizeEnd(event: any): void {
    super.onResizeEnd(event);
    setTimeout(() => {
      this.isResizingCarousel = false;
    }, 1);
  }
}
