import { Component, Input } from '@angular/core';

@Component({
  selector: 'wb-elipse-properties',
  templateUrl: './elipse-properties.component.html',
  styleUrls: ['./elipse-properties.component.scss']
})
export class ElipsePropertiesComponent {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
}
