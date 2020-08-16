import { EventEmitter, Injectable } from '@angular/core';

import {
  EditorBaseElement,
} from '../../components/editor/editor-components/editor-element-base-classes/editor-base-element';

@Injectable()
export class EditorInteractionService {
  private selectedElementInstance: EditorBaseElement;
  public selectedElementChanged = new EventEmitter<EditorBaseElement>();

  public getSelectedElement(): EditorBaseElement {
    return this.selectedElementInstance;
  }

  // TODO: Allow multiple selection (group selection)
  public selectElement(elementInstance: EditorBaseElement): void {
    // TODO: Get snapshot of element, not element
      // * If component is deleted it will work anyway
    this.selectedElementInstance = elementInstance;
    this.selectedElementChanged.next(elementInstance);
  }
}
