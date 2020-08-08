import { AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { NgxMoveableComponent } from 'ngx-moveable';
import { Frame } from 'scenejs';
import {
  EditorElementInstanceFrame,
} from 'src/app/editor-container/tokens/classes/element/instance/editor-element-instance-frame.class';

import { EditorComponent } from '../../editor.component';

export abstract class EditorBaseElement implements AfterViewInit {
  @Input() public frame: Frame = new EditorElementInstanceFrame({
    width: '250px',
    height: '200px'
  });
  @Input() public data: any;
  @Input() public editor: EditorComponent;
  @ViewChild('moveable', { static: false }) moveable: NgxMoveableComponent;
  public target = this.elementRef?.nativeElement;

  protected preUpdateFrame = new Map<string, () => any>();
  protected postUpdateFrame = new Map<string, () => any>();
  public abstract readonly elementTypeId: string;

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    // First change after component is instanced
    this.updateFrame(this.elementRef.nativeElement);
  }

  /**
   * Update element frame
   * @param target Target Element
   */
  public updateFrame(target: HTMLElement = this.target): void {
    this.preUpdateFrame.forEach(fn => { fn(); });
    target.style.cssText = this.frame.toCSS();
    this.postUpdateFrame.forEach(fn => { fn(); });
    this.updateTransformationStyle();
    setTimeout(() => {
      this.moveable.updateRect();
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
