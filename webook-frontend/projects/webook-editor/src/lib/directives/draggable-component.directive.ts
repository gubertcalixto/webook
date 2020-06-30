import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { DraggableLimitedComponent } from './bases/draggable-limited-base.class';


@Directive({
  selector: '[wbDnd]'
})
export class DraggableComponentDirective extends DraggableLimitedComponent implements OnInit, OnDestroy {
  @Input('wbDnd') protected isActive: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('wbDndBoundary') protected boundaryEl: HTMLElement;

  @HostBinding('draggable') public get draggable() { return true; }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef.nativeElement, renderer);
  }

  ngOnInit() {
    if (super.ngOnInit) {
      super.ngOnInit();
    }
    if (!this.hasLimits) {
      // add listener to moving drag and drop
      document.addEventListener('dragover', (ev: DragEvent) => {
        this.temporaryCoordX = ev.x;
        this.temporaryCoordY = ev.y;
      });
    }
  }

  ngOnDestroy(): void {
    if (!this.hasLimits && this.dragoverEventListener) {
      document.removeEventListener('dragover', this.dragoverEventListener);
    }
  }
}
