import { Component } from '@angular/core';

import { WebookEditorElementRenderer } from './tokens/webook-editor-element-renderer';
import { WebookEditorService } from './webook-editor.service';

@Component({
  selector: 'wb-editor',
  templateUrl: './webook-editor.component.html',
  styleUrls: ['./webook-editor.component.scss']
})
export class WebookEditorComponent extends WebookEditorElementRenderer {
  constructor(public editorService: WebookEditorService) {
    super(editorService);
  }
}
