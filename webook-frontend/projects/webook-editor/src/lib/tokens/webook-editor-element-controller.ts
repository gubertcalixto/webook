import { WebookEditorElement } from '@wb-editor-base/webook-editor-element';

export class WebookEditorElementController {
  private internalEditMode = true;
  public get editMode(): boolean {
    return this.internalEditMode;
  }
  public set editMode(value: boolean) {
    this.internalEditMode = value;
    if (!value) {
      this.activeEditorElementIndex = -1;
    }
  }

  public editorElements: WebookEditorElement[] = [];
  public activeEditorElementIndex = -1;

  public get activeEditorElement() {
    return this.editorElements[this.activeEditorElementIndex];
  }

  public setEditorElementAsActive(elIndex: number = -1) {
    if (this.editMode) {
      this.activeEditorElementIndex = elIndex;
    }
  }

  public addEditorElement(element: any): void {
    this.editorElements.push(element);
  }

  public removeEditorElement(element: any | number): void {
    const index = typeof element === 'number' ? element : this.editorElements.findIndex(element);
    if (index !== -1) {
      this.editorElements.splice(index, 1);
    }
  }
}
