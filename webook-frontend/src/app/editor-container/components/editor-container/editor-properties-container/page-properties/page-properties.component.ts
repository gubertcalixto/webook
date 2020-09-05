import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wb-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagePropertiesComponent {
  public backgroundColor: string = '#fff';
  public backgroundImage: string;

  public setBackground(type: 'color' | 'image', backgroundValue: string) {
    if (type === 'color') {
      this.backgroundColor = backgroundValue;
    } else {
      this.backgroundImage = backgroundValue;
    }
    const changeData = {
      backgroundColor: this.backgroundColor,
      backgroundImage: this.backgroundImage
    };
    // TODO: Emit change
  }
}
