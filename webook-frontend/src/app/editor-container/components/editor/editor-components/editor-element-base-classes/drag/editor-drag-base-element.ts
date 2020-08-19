import { MoveableEventsParameters } from 'moveable';

import { EditorBaseElement } from '../editor-base-element';
import { EditorDragBaseElementOptions } from './editor-drag-base-element-options';

export abstract class EditorDragBaseElement extends EditorBaseElement {
  public get boundaryEl(): HTMLElement {
    return this.editor?.elementHTML;
  }

  public get limitsCoords() {
    return {
      left: this.boundaryEl.offsetLeft,
      right: this.boundaryEl.offsetLeft + this.boundaryEl.clientWidth,
      top: this.boundaryEl.offsetTop,
      bottom: this.boundaryEl.offsetTop + this.boundaryEl.clientHeight,
    };
  }

  public dragOptions: Partial<EditorDragBaseElementOptions> = new EditorDragBaseElementOptions({
    hasOrigin: false,
    draggable: true,
    dragTarget: this.boundaryEl,
  });

  private getLimitedPositionX(coordX: number): number {
    if (!this.limitsCoords) { return coordX; }
    if (coordX < 0) { return 0; }
    if (coordX > (this.boundaryEl.clientWidth - this.target.clientWidth)) {
      return this.boundaryEl.clientWidth - this.target.clientWidth;
    }
    return coordX;
  }

  private getLimitedPositionY(coordY: number) {
    if (!this.limitsCoords) { return coordY; }
    if (coordY < 0) { return 0; }
    if (coordY > this.boundaryEl.clientHeight - this.target.clientHeight) {
      return this.boundaryEl.clientHeight - this.target.clientHeight;
    }
    return coordY;
  }

  public isCoordinatesValid(x: number, y: number) {
    return x === this.getLimitedPositionX(x) && y === this.getLimitedPositionY(y);
  }

  private setFramePosition(
    left: number = this.dragOptions.coordinates.x,
    top: number = this.dragOptions.coordinates.y
  ) {
    this.frame.set('left', `${left}px`);
    this.frame.set('top', `${top}px`);
    this.updateFrame();
  }

  public onDragStart(event: MoveableEventsParameters['dragStart']) {
    (event.inputEvent as MouseEvent).preventDefault();
    (event.inputEvent as MouseEvent).stopPropagation();
    this.dragOptions.isDragging = true;
  }

  public onDrag(event: MoveableEventsParameters['drag']) {
    (event.inputEvent as MouseEvent).preventDefault();
    (event.inputEvent as MouseEvent).stopPropagation();
    
    let left = event.left;
    let top = event.top;
    if (!this.dragOptions.allowExceedDuringDrag) {
      left = this.getLimitedPositionX(left);
      top = this.getLimitedPositionY(top);
    }
    this.dragOptions.temporaryCoordinates.x = left;
    this.dragOptions.temporaryCoordinates.y = top;
    this.setFramePosition(left, top);
    this.updateFrame();
  }

  public onDragEnd(event: MoveableEventsParameters['dragEnd']) {
    (event.inputEvent as MouseEvent).preventDefault();
    (event.inputEvent as MouseEvent).stopPropagation();
    if (
      !this.dragOptions.temporaryCoordinates ||
      !this.dragOptions.temporaryCoordinates.x ||
      !this.dragOptions.temporaryCoordinates.y
    ) {
      return;
    }
    const tempX = this.dragOptions.temporaryCoordinates.x;
    const tempY = this.dragOptions.temporaryCoordinates.y;
    this.dragOptions.coordinates = {
      x: this.getLimitedPositionX(tempX),
      y: this.getLimitedPositionY(tempY)
    };
    this.dragOptions.temporaryCoordinates = {};
    this.setFramePosition();
    this.dragOptions.isDragging = false;
  }
}
