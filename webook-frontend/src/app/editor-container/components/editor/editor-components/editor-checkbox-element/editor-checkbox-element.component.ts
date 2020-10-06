import { Component, ElementRef } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { EditorResizeBaseElement } from '../editor-element-base-classes/resize/editor-resize-base-element';
import { EditorCheckboxElementData } from './tokens/editor-checkbox-element-data.interface';

@Component({
  selector: 'wb-editor-checkbox-element',
  templateUrl: './editor-checkbox-element.component.html',
  styleUrls: ['./editor-checkbox-element.component.scss'],
})
export class EditorCheckboxElementComponent extends EditorResizeBaseElement {
  private _options: EditorCheckboxElementData[];
  private hasStarted = false;
  public elementTypeId = 'wb-checkbox';
  public checked: boolean;

  public get options(): EditorCheckboxElementData[] {
    return this._options;
  }
  public set options(value: EditorCheckboxElementData[]) {
    this._options = value;
    this.data.checkboxOptions = this.options;
    if (this.hasStarted) {
      this.emitChange();
    }
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
    this.subs.push(this.dataChanged.subscribe(() => {
      if (!this.data) { return; }
      this.setData();
      this.emitChange(true);
    }));
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.setInitialSize();
    this.setData();
    this.hasStarted = true;
  }

  public avoidCheckboxClick(event: MouseEvent): boolean {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  private setInitialSize(): void {
    const width = this.frame.get('width');
    if (width === undefined || width === null || width === 'unset') {
      this.frame.set('width', '200px');
      this.updateFrame();
    }
  }

  private setData(): void {
    if (this.options !== this.data.checkboxOptions) {
      this.options = this.data.checkboxOptions;
    }
    if (!this.options?.length) {
      this.options = [{ id: uuid(), label: 'Campo 1' }];
    }
  }
}
