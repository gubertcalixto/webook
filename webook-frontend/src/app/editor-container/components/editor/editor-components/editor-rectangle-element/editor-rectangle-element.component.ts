import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-rectangle-component',
  templateUrl: './editor-rectangle-element.component.html',
  styleUrls: ['./editor-rectangle-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorRectangleElementComponent extends EditorResizeBaseElement {
  private initialWidth = 200;
  private initialHeight = 200;
  private initialColor = '#000';
  public elementTypeId = 'wb-rectangle';
  public backgroundColor = this.initialColor;
  public hasBorder = false
  public borderSize: number;
  public borderColor = this.initialColor;
  public borderStyle = 'solid';

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
    this.subs.push(this.dataChanged.subscribe(() => {
      if (!this.data) { return; }
      this.setData();
      this.emitChange(true);
    }));
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.setData();
    this.setInitialSize();
    this.updateFrame();
  }

  private setInitialSize(): void {
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

  private setData(): void {
    if (this.backgroundColor !== this.data.backgroundColor) {
      this.backgroundColor = this.data.backgroundColor || this.initialColor;
    }
    if (this.hasBorder !== this.data.hasBorder) {
      this.hasBorder = this.data.hasBorder;
    }
    if (this.borderSize !== this.data.borderSize) {
      this.borderSize = this.data.borderSize || 0;
    }
    if (this.borderColor !== this.data.borderColor) {
      this.borderColor = this.data.borderColor || this.initialColor;
    }
    if (this.borderStyle !== this.data.borderStyle) {
      this.borderStyle = this.data.borderStyle || 'solid';
    }
  }
}
