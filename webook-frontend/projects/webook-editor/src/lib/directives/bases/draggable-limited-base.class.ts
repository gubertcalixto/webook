import { OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { EditorDraggableBaseComponent } from './editor-draggable-component.base';

export abstract class DraggableLimitedComponent extends EditorDraggableBaseComponent implements OnInit, OnDestroy {
  private limitsCoords: {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
  };
  protected abstract boundaryEl: HTMLElement;
  public hasLimits = true;

  constructor(protected draggableElement: HTMLElement, protected renderer: Renderer2) {
    super(draggableElement, renderer);
  }

  ngOnInit(): void {
    this.hasLimits = Boolean(this.boundaryEl);
    if (!this.boundaryEl) {
      return;
    }
    this.limitsCoords = {
      left: this.boundaryEl.offsetLeft,
      right: this.boundaryEl.offsetLeft + this.boundaryEl.clientWidth,
      top: this.boundaryEl.offsetTop,
      bottom: this.boundaryEl.offsetTop + this.boundaryEl.clientHeight,
    };

    // add listener to moving drag and drop
    this.boundaryEl.addEventListener('dragover', this.dragoverEventListener);
  }

  ngOnDestroy(): void {
    if (this.dragoverEventListener) {
      this.boundaryEl.removeEventListener('dragover', this.dragoverEventListener);
    }
  }

  public getLimitedPositionX(coordX: number): number {
    if (!this.limitsCoords) {
      return coordX;
    }
    if (coordX < 0) {
      return 0;
    } else if (coordX > (this.boundaryEl.clientWidth - this.draggableElement.clientWidth)) {
      return this.boundaryEl.clientWidth - this.draggableElement.clientWidth;
    }
    return coordX;
  }

  public getLimitedPositionY(coordY: number) {
    if (!this.limitsCoords) {
      return coordY;
    }
    if (coordY < 0) {
      return 0;
    } else if (coordY > this.boundaryEl.clientHeight - this.draggableElement.clientHeight) {
      return this.boundaryEl.clientHeight - this.draggableElement.clientHeight;
    }
    return coordY;
  }

  protected setCoords(tempX: number, tempY: number, delX: number, delY: number) {
    if (!tempX || !tempY) {
      return;
    }
    const el = this.draggableElement;
    const coordXToMove = (tempX - delX);
    const coordYToMove = (tempY - delY);
    this.renderer.setStyle(el, 'left', this.getLimitedPositionX(coordXToMove) + 'px');
    this.renderer.setStyle(el, 'top', this.getLimitedPositionY(coordYToMove) + 'px');
  }
}
