import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-text-properties',
  templateUrl: './text-properties.component.html',
  styleUrls: ['./text-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextPropertiesComponent implements OnInit {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
