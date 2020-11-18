import { ElementRef, Injector } from '@angular/core';
import { MoveableEventsParameters } from 'moveable';

import { EditorDragBaseElement } from '../drag/editor-drag-base-element';
import { EditorRotateBaseElementOptions } from './editor-rotate-base-element-options';

export abstract class EditorRotateBaseElement extends EditorDragBaseElement {
  public rotateOptions: Partial<EditorRotateBaseElementOptions> = new EditorRotateBaseElementOptions();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    injector: Injector
  ) {
    super(elementRef, injector);
    this.postUpdateFrame.set('editor-rotate', () => {
      this.updateRotation(this.rotateOptions.temporaryRotation ? this.rotateOptions.temporaryRotation : this.rotateOptions.rotation, false);
    });
  }

  ngAfterViewInit(): void {
    const initialRotation = this.frame.get('transform').rotate;
    if (initialRotation) {
      this.rotateOptions.rotation = initialRotation;
      this.frame.set('rotate', `${initialRotation}`);
    }
    super.ngAfterViewInit();
  }

  private updateRotationPosition(): void {
    const targetTop = Number(String(this.frame.get('top')).replace('px', ''));
    const rotationButtonHeight = 50; // px
    const newRotatePosition = (isNaN(targetTop) ? 0 : targetTop) <= rotationButtonHeight
      ? 'bottom'
      : 'top';
    if (this.rotateOptions.rotatePosition !== newRotatePosition) {
      // To avoid expression changed
      setTimeout(() => { this.rotateOptions.rotatePosition = newRotatePosition; });
    }
  }

  private updateRotation(rotation = this.rotateOptions.rotation, needsToUpdateFrame = true) {
    this.updateRotationPosition();
    rotation = rotation ? rotation : this.rotateOptions.rotation;
    while (rotation > 360) {
      rotation -= 360;
    }
    if (this.frame.get('rotate') === rotation) {
      return;
    }
    this.frame.set('rotate', rotation);


    if (needsToUpdateFrame) {
      this.updateFrame();
    }
  }

  public onRotateStart(event: MoveableEventsParameters['rotateStart']): void {
    if (this.visualizeMode) { return; }
    this.rotateOptions.isRotating = true;
  }

  public onRotate(event: MoveableEventsParameters['rotate']): void {
    if (this.visualizeMode) { return; }
    // Current Rotation + Added rotation
    this.rotateOptions.temporaryRotation = event.beforeRotate + (this.rotateOptions.rotation || 0);
    this.updateRotation(this.rotateOptions.temporaryRotation);
  }

  public onRotateEnd(event: MoveableEventsParameters['rotateEnd']): void {
    if (this.visualizeMode) { return; }
    this.rotateOptions.rotation = this.rotateOptions.temporaryRotation;
    this.rotateOptions.temporaryRotation = undefined;
    this.rotateOptions.isRotating = false;
    this.updateFrame();
  }
}
