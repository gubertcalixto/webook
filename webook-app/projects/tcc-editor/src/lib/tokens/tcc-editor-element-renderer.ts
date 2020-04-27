import {TccEditorService} from '../tcc-editor.service';
import {TccEditorShortcutsManager} from './tcc-editor-shortcuts-manager';
import {isDevMode} from '@angular/core';

export class TccEditorElementRenderer extends TccEditorShortcutsManager {
  constructor(protected editorService: TccEditorService) {
    super();
  }

  public addElementToEditor(id: string): void {
    const component = this.editorService.getElementContentById(id);
    if (!component) {
      if(isDevMode()){
        console.error(`Component "${id}" not found`);
      }
      return;
    }
    this.editorElements.push({
      component
    });
    this.setEditorElementAsActive(this.editorElements.length - 1);
  }
}
