import { ElementRef } from '@angular/core';
import { MoveableEventsParameters } from 'moveable';

import { EditorRotateBaseElement } from '../rotate/editor-rotate-base-element';
import { EditorResizeBaseElementOptions } from './editor-resize-base-element-options';

export abstract class EditorResizeBaseElement extends EditorRotateBaseElement {
  public resizeOptions: Partial<EditorResizeBaseElementOptions> = new EditorResizeBaseElementOptions();

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  public onResizeStart(event: MoveableEventsParameters['resizeStart']): void {
    if (this.readonlyMode) { return; }
    this.resizeOptions.isResizing = true;
  }

  public onResize(event: MoveableEventsParameters['resize']): void {
    if (this.readonlyMode) { return; }
    const setWidth = () => {
      let oldWidth = Number(String(this.frame.get('width')).replace('px', ''));
      if (isNaN(oldWidth)) { oldWidth = this.target.clientWidth; }
      const width = event.width;
      const elementLeft = Number(String(this.frame.get('left')).replace('px', ''));
      const widthDiff = (event.delta[0] >= 0 ? 1 : -1) * Math.abs(event.width - oldWidth);
      if (event.direction[0] === -1) {
        const newLeft = oldWidth < width
          ? elementLeft + -Math.abs(widthDiff)
          : elementLeft + Math.abs(widthDiff);
        if (this.boundaryEl.clientWidth > newLeft + width && newLeft >= 0) {
          this.frame.set('left', `${newLeft}px`);
          this.frame.set('width', `${width}px`);
        }
      } else if (this.boundaryEl.clientWidth > elementLeft + width) {
        this.frame.set('width', `${width}px`);
      }
    };

    const setHeight = () => {
      let oldHeight = Number(String(this.frame.get('height')).replace('px', ''));
      if (isNaN(oldHeight)) { oldHeight = this.target.clientHeight; }
      const height = event.height;
      const elementTop = Number(String(this.frame.get('top')).replace('px', ''));
      const heightDiff = (event.delta[1] >= 0 ? 1 : -1) * Math.abs(event.height - oldHeight);
      if (event.direction[1] === -1) {
        const newTop = oldHeight < height
          ? elementTop + -Math.abs(heightDiff)
          : elementTop + Math.abs(heightDiff);
        if (this.boundaryEl.clientHeight > newTop + height && newTop >= 0) {
          this.frame.set('top', `${newTop}px`);
          this.frame.set('height', `${height}px`);
        }
      } else if (this.boundaryEl.clientHeight > elementTop + height) {
        this.frame.set('height', `${height}px`);
      }
    };

    setWidth();
    setHeight();
    this.updateFrame();
  }

  public onResizeEnd(event: MoveableEventsParameters['resizeEnd']): void {
    if (this.readonlyMode) { return; }
    this.resizeOptions.isResizing = false;
  }
}
