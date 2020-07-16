import { isDevMode } from '@angular/core';
import { WebookEditorElement } from '@wb-editor-base/webook-editor-element';
import { v4 as uuidv4 } from 'uuid';

import { WebookEditorService } from '../webook-editor.service';
import { WebookEditorShortcutsManager } from './webook-editor-shortcuts-manager';

export class WebookEditorElementRenderer extends WebookEditorShortcutsManager {
  constructor(protected editorService: WebookEditorService) {
    super();
  }

  public addElementToEditor(id: string): void {
    const component = this.editorService.getElementClassById(id);
    if (!component) {
      if (isDevMode()) {
        console.error(`Component "${id}" not found`);
      }
      return;
    }
    this.editorElements.push( new WebookEditorElement({
      id: uuidv4(),
      componentClass: component
    }));
    this.setEditorElementAsActive(this.editorElements.length - 1);
  }
}
