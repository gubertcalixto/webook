import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { HostListener } from '@angular/core';

import { WebookEditorElementController } from './webook-editor-element-controller';

export class WebookEditorShortcutsManager extends WebookEditorElementController {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.activeEditorElement) {
      // TODO IMPLEMENT KEY_CODE CORRECTLY
      // SHORTCUT PACKAGE: https://www.npmjs.com/package/ng-keyboard-shortcuts
      if (this.editMode && event.keyCode === DELETE || event.keyCode === BACKSPACE) {
        this.editorElements.splice(this.activeEditorElementIndex, 1);
      }
    }
  }
}
