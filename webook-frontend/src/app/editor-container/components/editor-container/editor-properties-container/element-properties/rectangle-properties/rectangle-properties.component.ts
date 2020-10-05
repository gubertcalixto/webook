import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wb-rectangle-properties',
  templateUrl: './rectangle-properties.component.html',
  styleUrls: ['./rectangle-properties.component.scss']
})
export class RectanglePropertiesComponent implements OnInit {
  @Input() public currentElementSelectedData: any;
  @Input() public setDataProperty: (fieldName: string, fieldValue: any) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
