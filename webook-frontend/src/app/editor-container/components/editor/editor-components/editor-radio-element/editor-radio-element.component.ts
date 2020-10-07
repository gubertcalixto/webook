import { Component, ElementRef } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';
import { EditorRadioElementData } from './tokens/editor-radio-element-data.interface';

@Component({
  selector: 'wb-editor-radio-component',
  templateUrl: './editor-radio-element.component.html',
  styleUrls: ['./editor-radio-element.component.scss'],
})
export class EditorRadioElementComponent extends EditorResizeBaseElement {
  private internalOptions: EditorRadioElementData[];
  private hasStarted = false;
  public elementTypeId = 'wb-radio';
  public selectedOption: string;

  public get options(): EditorRadioElementData[] {
    return this.internalOptions;
  }
  public set options(value: EditorRadioElementData[]) {
    this.internalOptions = value;
    this.data.radioOptions = value;
    if (this.hasStarted) {
      this.emitChange();
    }
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
    this.subs.push(this.dataChanged.subscribe(() => {
      if (!this.data) { return; }
      this.setData();
      if (this.hasStarted) {
        this.emitChange();
      }
    }));
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.setInitialSize();
    this.setData();
    this.hasStarted = true;
  }

  private setInitialSize(): void {
    const width = this.frame.get('width');
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      this.updateFrame();
    }
  }

  public updateSelectedOption(optionId: string) {
    this.selectedOption = optionId;
    this.data.selectedOption = optionId;
    this.emitChange();
  }

  private setData(): void {
    if (this.options !== this.data.radioOptions) {
      this.options = this.data.radioOptions;
    }
    if (this.selectedOption !== this.data.selectedOption) {
      this.selectedOption = this.data.selectedOption;
    }
    if (!this.options?.length || (this.options.length === 1 && !this.selectedOption)) {
      this.options = [{ id: uuid(), label: 'Campo 1' }];
      // Avoids console error
      setTimeout(() => {
        this.updateSelectedOption(this.options[0].id);
      });
    }
  }
}
