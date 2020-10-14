import { Component, ViewEncapsulation } from '@angular/core';

import { EditorDocumentPageInstanceService } from '../../../../services/document-page-instance.service';

@Component({
  selector: 'wb-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagePropertiesComponent {
  public backgroundColor: string = '#fff';
  public backgroundImage: string;

  constructor(private editorDocumentPageInstanceService: EditorDocumentPageInstanceService) {
    this.editorDocumentPageInstanceService.dataChanged.subscribe(res => {
      this.backgroundColor = res?.backgroundColor;
      this.backgroundImage = res?.backgroundImage;
    });
  }

  public setBackground(type: 'color' | 'image', backgroundValue: string) {
    if (type === 'color') {
      this.backgroundColor = backgroundValue;
    } else {
      this.backgroundImage = backgroundValue;
    }
    this.editorDocumentPageInstanceService.setData({
      backgroundColor: this.backgroundColor,
      backgroundImage: this.backgroundImage
    })
  }
}
