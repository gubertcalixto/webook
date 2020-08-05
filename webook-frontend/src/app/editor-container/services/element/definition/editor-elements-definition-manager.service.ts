import { Injectable } from '@angular/core';

import { EditorElementDefinition } from '../../../tokens/classes/element/definition/editor-element-definition.class';
import { editorDefaultElements } from '../../../tokens/consts/element/definition/editor-default-elements.const';

@Injectable()
export class EditorElementsDefinitionManagerService {
  private imagesPreview: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
  private registeredItems: EditorElementDefinition[];
  public get items() {
    return [...this.registeredItems];
  }

  constructor() {
    this.getEditorElementDefinitions();
    this.preloadImagePreview();
  }
  
  public getEditorElementDefinition(elementId: string): EditorElementDefinition {
    return this.registeredItems.find(d => d.elementId === elementId);
  }

  public getImagePreview(itemId: string): HTMLImageElement {
    if (!itemId || !this.imagesPreview.has(itemId)) {
      return;
    }
    return this.imagesPreview.get(itemId);
  }

  
  private getEditorElementDefinitions(): void {
    this.registeredItems = editorDefaultElements;
  }

  /** Makes sure that image preview will be loaded on drag */
  private preloadImagePreview(): void {
    this.registeredItems
      .filter(item => Boolean(item.imagePreviewPath))
      .forEach(item => {
        const itemImagePreview = new Image();
        itemImagePreview.src = item.imagePreviewPath;
        this.imagesPreview.set(item.elementId, itemImagePreview);
      });
  }
}
