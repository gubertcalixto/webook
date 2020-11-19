import { Component, ElementRef, Injector } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';
import { EditorCheckboxElementData } from './tokens/editor-checkbox-element-data.interface';

@Component({
  selector: 'wb-editor-checkbox-element',
  templateUrl: './editor-checkbox-element.component.html',
  styleUrls: ['./editor-checkbox-element.component.scss'],
})
export class EditorCheckboxElementComponent extends EditorResizeBaseElement {
  private internalOptions: EditorCheckboxElementData[];
  public elementTypeId = 'wb-checkbox';

  public get options(): EditorCheckboxElementData[] {
    return this.internalOptions;
  }
  public set options(value: EditorCheckboxElementData[]) {
    this.internalOptions = value;
    this.data.checkboxOptions = this.options;
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
    if (this.options !== this.data.checkboxOptions) {
      this.options = this.data.checkboxOptions;
    }
    if (!this.options?.length) {
      this.options = [{ id: uuid(), label: 'Campo 1' }];
    }
  }
}
