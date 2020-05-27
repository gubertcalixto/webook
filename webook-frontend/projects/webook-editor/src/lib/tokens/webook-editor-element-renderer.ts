import { isDevMode } from '@angular/core';

import { WebookEditorService } from '../webook-editor.service';
import { WebookEditorShortcutsManager } from './webook-editor-shortcuts-manager';

export class WebookEditorElementRenderer extends WebookEditorShortcutsManager {
  constructor(protected editorService: WebookEditorService) {
    super();
  }

  public addElementToEditor(id: string): void {
    const component = this.editorService.getElementContentById(id);
    if (!component) {
      if (isDevMode()) {
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
