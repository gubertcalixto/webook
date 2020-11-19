import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxMoveableComponent } from 'ngx-moveable';
import { Subject, Subscription } from 'rxjs';
import { Frame } from 'scenejs';
import {
  EditorElementInstanceFrame,
} from 'src/app/editor-container/tokens/classes/element/instance/editor-element-instance-frame.class';
import { v4 as uuid } from 'uuid';

import { EditorComponent } from '../../editor.component';

export abstract class EditorBaseElement implements AfterViewInit, OnDestroy {
  public abstract readonly elementTypeId: string;

  protected subs: Subscription[] = [];
  protected preUpdateFrame = new Map<string, () => any>();
  protected postUpdateFrame = new Map<string, () => any>();
  protected hasStarted = false;

  private frameSnapshot: string;

  public target = this.elementRef?.nativeElement;
  public elementId = uuid();
  public forceMoveableEnable = false;
  public isLoading = true;
  public isMouseOver: boolean;
  public dataChanged = new Subject<void>();
  public hasFinishedDataEntry: boolean;

  @HostBinding('class') public readonly defaultClasses = 'editor-element';
  // #region MoveableEvents
  @HostListener('mouseover') private onElementMouseOver() {
    this.isMouseOver = true;
    if (!this.hasSelectionEnded || this.editor?.selectedElementIds.length === 0) {
      this.forceMoveableEnable = true;
    }
  }
  @HostListener('mouseout') private onElementMouseOut() {
    this.isMouseOver = false;
    if (this.forceMoveableEnable) { this.forceMoveableEnable = false; }
  }
  @HostListener('mousedown') private onElementClick() {
    if (!this.hasSelectionEnded || this.editor.selectedElementIds.length > 0) { return; }
    this.editor.selectedElementIds.push(this.elementId);
    this.editor.selectedElementIdsSubject.next(this.editor.selectedElementIds);
  }
  // #endregion MoveableEvents
  @ViewChild('moveable', { static: false }) moveable: NgxMoveableComponent;

  @Input() public frame: Frame = new EditorElementInstanceFrame({
    width: '250px',
    height: '200px'
  });
  @Input() public data: any = {};
  @Input() public editor: EditorComponent;
  @Input() public visualizeMode = false;
  @Output() public change = new EventEmitter<string>();

  @HostBinding('class.selected') public get isSelected() {
    return this.editor?.currentSelectedElementIds?.includes(this.elementId);
  }
  @HostBinding('class.only-selected') public get isOnlySelected() {
    return this.editor?.currentSelectedElementIds?.length === 1 && this.isSelected;
  }
  public get hasSelectionEnded() {
    return !this.editor?.isSelecting;
  }
  public get moveableClasses() {
    if (!this.hasSelectionEnded) { return undefined; }
    if (this.isOnlySelected) { return 'only selected' }
    if (this.isSelected) { return 'selected'; }
    return undefined;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    this.subs.push(this.dataChanged.subscribe(() => {
      if (!this.data) { return; }
      this.setData();
      if (this.hasStarted) {
        this.emitChange();
      }
    }));
  }

  ngAfterViewInit(): void {
    // First change after component is instanced
    this.updateFrame(this.elementRef.nativeElement, true);
    // Sets element id
    this.elementId = this.elementId ? this.elementId : uuid();
    this.elementRef.nativeElement.id = this.elementId;
    if (!this.data) {
      this.data = {};
    }
    this.setInitialSize();
    this.setData();
    this.hasStarted = true;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  protected abstract setInitialSize(): void;
  protected abstract setData(): void;

  /**
   * Update element frame
   * @param target Target Element
   */
  public updateFrame(target: HTMLElement = this.target, ignoreEmitChange = false): void {
    this.preUpdateFrame.forEach(fn => { fn(); });
    target.style.cssText = this.frame.toCSS();
    this.postUpdateFrame.forEach(fn => { fn(); });
    this.updateTransformationStyle();
    if (!this.hasFinishedDataEntry) {
      return;
    }
    setTimeout(() => {
      if (!this.frameSnapshot || this.frameSnapshot !== JSON.stringify(this.frame.properties)) {
        this.moveable?.updateRect();
        if (!ignoreEmitChange) {
          this.emitChange();
        }
      }
    });
  }

  public emitChange(forceEmit = false): void {
    if (!forceEmit && this.visualizeMode) { return; }
    this.change.next(this.elementId);
  }

  private updateTransformationStyle(): void {
    let transformStyle = '';
    const frameTransform = {
      rotate: this.frame.get('rotate'),
      scaleX: this.frame.get('scaleX'),
      scaleY: this.frame.get('scaleY'),
      matrix3d: this.frame.get('matrix')
    };

    if (frameTransform.rotate) {
      transformStyle += ` rotate(${frameTransform.rotate ?? 0}deg)`;
    }
    if (frameTransform.scaleX) {
      transformStyle += ` scaleX(${frameTransform.scaleX})`;
    }
    if (frameTransform.scaleY) {
      transformStyle += ` scaleY(${frameTransform.scaleY})`;
    }
    if (frameTransform.matrix3d && frameTransform.matrix3d.length) {
      transformStyle += ` matrix3d(${frameTransform.matrix3d.join(', ')})`;
    }
    this.target.style.transform = transformStyle.trim();
    this.frame.set('transform', frameTransform)
  }
}
