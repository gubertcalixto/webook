import {TccEditorElementController} from './tcc-editor-element-controller';
import {HostListener} from '@angular/core';
import {BACKSPACE, DELETE} from '@angular/cdk/keycodes';

export class TccEditorShortcutsManager extends TccEditorElementController {
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
