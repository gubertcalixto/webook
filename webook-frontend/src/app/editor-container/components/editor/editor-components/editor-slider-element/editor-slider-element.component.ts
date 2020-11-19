import { Component, ElementRef, Injector, ViewEncapsulation } from '@angular/core';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';

@Component({
  selector: 'wb-editor-slider-component',
  templateUrl: './editor-slider-element.component.html',
  styleUrls: ['./editor-slider-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorSliderElementComponent extends EditorResizeBaseElement {
  private readonly defaultSliderValue = 50;
  private _valueSlider = this.defaultSliderValue;
  public elementTypeId = 'wb-slider';
  public isVertical = false;
  public minValue = 0;
  public maxValue = 100;
  public isDisabled = false;

  public get valueSlider() { return this._valueSlider; }
  public set valueSlider(value: number) {
    this._valueSlider = value;
    this.data.valueSlider = this.valueSlider;
    if (this.hasStarted) {
      this.emitChange();
    }
  }

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    injector: Injector
  ) {
    super(elementRef, injector);
  }

  protected setInitialSize(): void {
    const width = this.frame.get('width');
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      this.updateFrame();
    }
  }

  protected setData(): void {
    if (this.valueSlider !== this.data.valueSlide) {
      this.valueSlider = this.data.valueSlider;
    }
    if (this.isVertical !== this.data.isVertical) {
      this.isVertical = this.data?.isVertical;
    }
    if (this.isDisabled !== this.data.isDisabled) {
      this.isDisabled = this.data?.isDisabled;
    }
    if (typeof this.data.minValue === 'number') {
      this.minValue = this.data?.minValue;
    }
    if (typeof this.data.maxValue === 'number') {
      this.maxValue = this.data?.maxValue;
    }
  }
}
