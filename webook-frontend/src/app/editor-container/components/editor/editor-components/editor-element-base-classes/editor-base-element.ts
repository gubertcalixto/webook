import { AfterViewInit, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { NgxMoveableComponent } from 'ngx-moveable';
import { Frame } from 'scenejs';
import {
  EditorElementInstanceFrame,
} from 'src/app/editor-container/tokens/classes/element/instance/editor-element-instance-frame.class';
import { v4 as uuid } from 'uuid';

import { EditorComponent } from '../../editor.component';

export abstract class EditorBaseElement implements AfterViewInit {
  public abstract readonly elementTypeId: string;

  protected preUpdateFrame = new Map<string, () => any>();
  protected postUpdateFrame = new Map<string, () => any>();

  public target = this.elementRef?.nativeElement;
  public elementId = uuid();
  public forceMoveableEnable = false;

  @HostBinding('class') public readonly defaultClasses = 'editor-element';
  // #region MoveableEvents
  @HostListener('mouseover') private onElementMouseOver() {
    if (!this.hasSelectionEnded || this.editor?.selectedElementIds.length === 0) {
      this.forceMoveableEnable = true;
    }
  }
  @HostListener('mouseout') private onElementMouseOut() {
    if (this.forceMoveableEnable) { this.forceMoveableEnable = false; }
  }
  @HostListener('mousedown') private onElementClick() {
    if (!this.hasSelectionEnded || this.editor.selectedElementIds.length > 0) { return; }
    this.editor.selectedElementIds.push(this.elementId);
  }
  // #endregion MoveableEvents
  @ViewChild('moveable', { static: false }) moveable: NgxMoveableComponent;

  @Input() public frame: Frame = new EditorElementInstanceFrame({
    width: '250px',
    height: '200px'
  });
  @Input() public data: any;
  @Input() public editor: EditorComponent;

  public get isSelected() {
    return this.editor?.currentSelectedElementIds?.includes(this.elementId);
  }
  public get isOnlySelected() {
    return this.editor?.currentSelectedElementIds?.length === 1 && this.isSelected;
  }
  public get hasSelectionEnded() {
    return !this.editor?.isSelecting;
  }
  public get moveableClasses() {
    if(!this.hasSelectionEnded) { return undefined; }
    if (this.isOnlySelected) { return 'only selected' }
    if (this.isSelected) { return 'selected'; }
    return undefined;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    // First change after component is instanced
    this.updateFrame(this.elementRef.nativeElement);
    // Sets element id
    this.elementId = this.elementId ? this.elementId : uuid();
    this.elementRef.nativeElement.id = this.elementId;
  }

  /**
   * Update element frame
   * @param target Target Element
   */
  public updateFrame(target: HTMLElement = this.target): void {
    const frameSnapshot = JSON.stringify(this.frame.properties);
    this.preUpdateFrame.forEach(fn => { fn(); });
    target.style.cssText = this.frame.toCSS();
    this.postUpdateFrame.forEach(fn => { fn(); });
    this.updateTransformationStyle();
    setTimeout(() => {
      if (frameSnapshot !== JSON.stringify(this.frame.properties)) {
        this.moveable.updateRect();
      }
    });
  }

  private updateTransformationStyle(): void {
    let transformStyle = '';
    if (this.frame.get('rotate')) {
      transformStyle += ` rotate(${this.frame.get('rotate') ?? 0}deg)`;
    }
    if (this.frame.get('scaleX')) {
      transformStyle += ` scaleX(${this.frame.get('scaleX')})`;
    }
    if (this.frame.get('scaleY')) {
      transformStyle += ` scaleY(${this.frame.get('scaleY')})`;
    }
    if (this.frame.get('matrix') && this.frame.get('matrix').length) {
      transformStyle += ` matrix3d(${this.frame.get('matrix').join(', ')})`;
    }
    this.target.style.transform = transformStyle.trim();
  }
}
