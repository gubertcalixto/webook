import { Component} from '@angular/core';
import { TccEditorService } from '@tcc-editor/tcc-editor.service';
import {TccEditorElementRenderer} from '@tcc-editor/tokens/tcc-editor-element-renderer';
import {safeLogger} from '@tcc-shared/tokens/safe-logger';

@Component({
  selector: 'tcc-editor',
  templateUrl: './tcc-editor.component.html',
  styleUrls: ['./tcc-editor.component.scss']
})
export class TccEditorComponent extends TccEditorElementRenderer {
  constructor(public editorService: TccEditorService) {
    super(editorService);
  }

  test(event: KeyboardEvent) {
    safeLogger(event);
  }
}
