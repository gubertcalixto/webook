import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-text-properties',
  templateUrl: './text-properties.component.html',
  styleUrls: ['./text-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextPropertiesComponent {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  
  public setTextType(textType: string): void {
    this.setDataProperty('textType', textType)
    this.setDataProperty('textSize', undefined)
  }
}
