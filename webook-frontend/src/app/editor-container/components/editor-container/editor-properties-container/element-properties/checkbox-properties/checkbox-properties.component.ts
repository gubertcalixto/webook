import { Component, Input, ViewEncapsulation } from '@angular/core';
import { v4 as uuid } from 'uuid';

import {
  EditorCheckboxElementData,
} from '../../../../../components/editor/editor-components/editor-checkbox-element/tokens/editor-checkbox-element-data.interface';

@Component({
  selector: 'wb-checkbox-properties',
  templateUrl: './checkbox-properties.component.html',
  styleUrls: ['./checkbox-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxPropertiesComponent {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;

  public get checkboxOptions(): EditorCheckboxElementData[] {
    return this.currentElementSelectedData.checkboxOptions;
  }

  public addCheckboxOption(): void {
    this.checkboxOptions.push({
      id: uuid(),
      label: `Campo ${this.checkboxOptions.length + 1}`,
      isChecked: false,
      isDisabled: false
    });
    this.setDataProperty('checkboxOptions', this.checkboxOptions);
  }

  public updateOptions(): void {
    this.setDataProperty('checkboxOptions', this.checkboxOptions);
  }

  public removeCheckboxOption(item: EditorCheckboxElementData): void {
    const index = this.checkboxOptions.findIndex(o => o.id === item.id);
    if (index !== -1) {
      this.checkboxOptions.splice(index, 1);
      this.setDataProperty('checkboxOptions', this.checkboxOptions);
    }
  }
}
