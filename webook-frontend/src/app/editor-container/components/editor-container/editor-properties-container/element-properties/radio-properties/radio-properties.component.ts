import { Component, Input, ViewEncapsulation } from '@angular/core';
import { v4 as uuid } from 'uuid';

import {
  EditorRadioElementData,
} from '../../../../editor/editor-components/editor-radio-element/tokens/editor-radio-element-data.interface';

@Component({
  selector: 'wb-radio-properties',
  templateUrl: './radio-properties.component.html',
  styleUrls: ['./radio-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioPropertiesComponent {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;

  public get radioOptions(): EditorRadioElementData[] {
    return this.currentElementSelectedData.radioOptions || [];
  }

  public addOption(): void {
    this.radioOptions.push({
      id: uuid(),
      label: `Campo ${this.radioOptions.length + 1}`,
      isDisabled: false
    });
    this.updateOptions();
  }

  public updateOptions(): void {
    this.setDataProperty('radioOptions', [...this.radioOptions]);
  }

  public updateSelectedOption(optionId: string): void {
    this.setDataProperty('selectedOption', optionId);
  }

  public removeOption(item: EditorRadioElementData): void {
    const index = this.radioOptions.findIndex(o => o.id === item.id);
    if (index !== -1) {
      this.radioOptions.splice(index, 1);
      this.updateOptions();
    }
  }
}
