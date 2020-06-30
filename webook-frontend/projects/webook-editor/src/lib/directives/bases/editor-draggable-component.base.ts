import { HostBinding, HostListener, Renderer2 } from '@angular/core';

export abstract class EditorDraggableBaseComponent {
  protected abstract isActive: boolean;
  @HostBinding('class.dragging') public isDragging = false;
  protected currentCoordX = 0;
  protected currentCoordY = 0;
  protected temporaryCoordX = 0;
  protected temporaryCoordY = 0;
  public hasLimits = false;
  protected dragoverEventListener = (event: DragEvent) => {
    event.preventDefault();
    this.temporaryCoordX = event.x;
    this.temporaryCoordY = event.y;
  }

  constructor(protected draggableElement: HTMLElement, protected renderer: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(dragStartEvent: DragEvent) {
    if (!this.isActive) {
      dragStartEvent.dataTransfer.effectAllowed = 'none';
      return;
    }
    dragStartEvent.dataTransfer.setData('text/plain', '');
    this.isDragging = true;
    this.currentCoordX = dragStartEvent.x - this.draggableElement.offsetLeft;
    this.currentCoordY = dragStartEvent.y - this.draggableElement.offsetTop;
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    if (!this.isActive) {
      return;
    }
    this.temporaryCoordX = event.x;
    this.temporaryCoordY = event.y;
    this.setCoords(this.temporaryCoordX, this.temporaryCoordY, this.currentCoordX, this.currentCoordY);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    if (!this.isActive) {
      return;
    }
    this.isDragging = false;
    this.currentCoordX = 0;
    this.currentCoordY = 0;
  }

  protected setCoords(tempX: number, tempY: number, delX: number, delY: number) {
    if (!tempX || !tempY) {
      return;
    }
    const el = this.draggableElement;
    const coordXToMove = (tempX - delX);
    const coordYToMove = (tempY - delY);
    this.renderer.setStyle(el, 'left', coordXToMove + 'px');
    this.renderer.setStyle(el, 'top', coordYToMove + 'px');
  }
}
