import { Component, ViewEncapsulation } from '@angular/core';

import { EditorDocumentPageInstanceService } from '../../../../services/document-page-instance.service';
import { EditorPageBackgroundPatterns } from './page-background-patterns.const';

@Component({
  selector: 'wb-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagePropertiesComponent {
  public backgroundColor: string = '#fff';
  public backgroundPattern: string;
  public backgroundPatterns = EditorPageBackgroundPatterns;

  constructor(private editorDocumentPageInstanceService: EditorDocumentPageInstanceService) {
    this.editorDocumentPageInstanceService.dataChanged.subscribe(res => {
      this.backgroundColor = typeof res?.backgroundColor !== 'string' ? '#fff' : res?.backgroundColor;
      this.backgroundPattern = typeof res?.backgroundPattern !== 'string' ? undefined : res?.backgroundPattern;
    });
  }

  public setBackground(type: 'color' | 'pattern', backgroundValue: string) {
    if (type === 'color') {
      this.backgroundColor = backgroundValue || '#fff';
    } else {
      this.backgroundPattern = backgroundValue;
    }
    this.editorDocumentPageInstanceService.setData({
      backgroundColor: this.backgroundColor,
      backgroundPattern: this.backgroundPattern
    })
  }
}
