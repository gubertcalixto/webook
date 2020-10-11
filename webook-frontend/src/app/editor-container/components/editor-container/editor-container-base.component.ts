import { ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';

import { DocumentOutput } from '../../../client/webook/model/models';
import { EditorDocumentPageService } from '../../services/document-page.service';
import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import {
  EditorElementsInstanceManagerService,
} from '../../services/element/instance/editor-elements-instance-manager.service';
import { EditorInteractionService } from '../../services/interactions/editor-interaction.service';
import { EditorElementInstanceData } from '../../tokens/classes/element/instance/editor-element-instance-data.class';
import { EditorElementHistoryData } from '../../tokens/classes/history/editor-history-pre-serialize.class';
import { EditorHistoryManager } from '../../tokens/classes/history/editor-history-stack.class';
import { EditorBaseElement } from '../editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorComponent } from '../editor/editor.component';

export abstract class EditorContainerBaseComponent implements OnInit, OnDestroy {
  public abstract visualizeMode: boolean;
  public abstract document: DocumentOutput;

  protected abstract editorElement: EditorComponent;
  protected subs: Subscription[] = [];
  private editorElementChangeSubscription: Subscription;

  private windowResizeListenerFn = () => { this.editorElements.forEach(element => { element.instance?.updateFrame(); }); };

  public editorHistory = new EditorHistoryManager();
  public editorElements: ComponentRef<EditorBaseElement>[] = [];

  public get toolboxItems() {
    return this.editorElementsManagerService?.items;
  }

  constructor(
    protected editorElementsManagerService: EditorElementsDefinitionManagerService,
    protected instanceManagerService: EditorElementsInstanceManagerService,
    protected documentPageService: EditorDocumentPageService,
    protected editorInteractionService: EditorInteractionService
  ) { }

  ngOnInit(): void {
    this.registerToWindowResize();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowResizeListenerFn);
    this.subs.forEach(s => s.unsubscribe());
    if (this.editorElementChangeSubscription && !this.editorElementChangeSubscription.closed) {
      this.editorElementChangeSubscription.unsubscribe();
    }
  }

  protected abstract emitDocumentPageSave(forceNoDebounce?: boolean, ignoreHistory?: boolean): void;
  protected abstract instanciateDocument(elementTypeId: string, data?: EditorElementInstanceData, elementId?: string): ComponentRef<EditorBaseElement>;

  private registerToWindowResize(): void {
    if (this.visualizeMode) { return; }
    window.addEventListener('resize', this.windowResizeListenerFn);
  }

  public editorDragOver(event: DragEvent): void {
    if (this.visualizeMode) { return; }
    event.preventDefault();
    // TODO
  }

  public editorDropElement(event: DragEvent): void {
    if (this.visualizeMode) { return; }
    const elementId = event.dataTransfer.getData('text/plain');
    if (typeof elementId !== 'string') {
      return;
    }
    const instanceData = new EditorElementInstanceData({
      frameProperties: {
        left: `${event?.offsetX}px`,
        top: `${event?.offsetY}px`,
      }
    });

    this.instanciateDocument(elementId, instanceData);
    this.emitDocumentPageSave(true);
  }

  protected undo(): void {
    if (!this.editorHistory.hasUndo()) { return; }
    const data = this.editorHistory.undo();
    this.instanciateElementsFromData(data);
    this.emitDocumentPageSave(false, true);
  }

  protected redo(): void {
    if (!this.editorHistory.hasRedo()) { return; }
    const data = this.editorHistory.redo();
    this.instanciateElementsFromData(data);
    this.emitDocumentPageSave(false, true);
  }

  protected instanciateElementsFromData(data: EditorElementHistoryData[]): void {
    if (this.editorElements.length) {
      this.resetEditorElements();
    }
    data.forEach(e => {
      this.instanciateDocument(e.elementTypeId, e.instanceData, e.elementId);
    });
  }

  protected resetEditorElements(): void {
    this.editorElements.forEach(elements => {
      elements.destroy();
    });
    this.editorElements = [];
  }

  protected subscribeToElementChanges(): void {
    if (this.visualizeMode) { return; }
    if (this.editorElementChangeSubscription) {
      this.editorElementChangeSubscription.unsubscribe();
    }
    this.editorElementChangeSubscription = merge(...this.editorElements.map(e => e.instance.change)).subscribe((elementId: string) => {
      this.emitDocumentPageSave();
    })
  }
}
