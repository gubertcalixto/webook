import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wb-slider-properties',
  templateUrl: './slider-properties.component.html',
  styleUrls: ['./slider-properties.component.scss']
})
export class SliderPropertiesComponent implements OnInit {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;
  constructor() { }

  ngOnInit(): void {
  }

}
