import { ComponentRef, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';

import { DocumentOutput } from '../../../client/webook/model/models';
import { EditorDocumentPageInstanceService } from '../../services/document-page-instance.service';
import { EditorDocumentPageService } from '../../services/document-page.service';
import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import {
  EditorElementsInstanceManagerService,
} from '../../services/element/instance/editor-elements-instance-manager.service';
import { EditorInteractionService } from '../../services/interactions/editor-interaction.service';
import { EditorDocumentPageInstanceData } from '../../tokens/classes/editor-document-page-instance-data.class';
import { IEditorExternalEvent } from '../../tokens/classes/editor-external-event.interface';
import { ImageUtils } from '../../tokens/classes/element/image-utils';
import { EditorElementInstanceData } from '../../tokens/classes/element/instance/editor-element-instance-data.class';
import { EditorElementHistoryData } from '../../tokens/classes/history/editor-history-pre-serialize.class';
import { EditorHistoryManager } from '../../tokens/classes/history/editor-history-stack.class';
import { EditorBaseElement } from '../editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorComponent } from '../editor/editor.component';

export abstract class EditorContainerBaseComponent implements OnInit, OnDestroy {
  public abstract visualizeMode: boolean;
  public abstract document: DocumentOutput;
  public abstract editorExternalEvent: IEditorExternalEvent;

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
    protected editorDocumentPageInstanceService: EditorDocumentPageInstanceService,
    protected editorElementsManagerService: EditorElementsDefinitionManagerService,
    protected instanceManagerService: EditorElementsInstanceManagerService,
    protected documentPageService: EditorDocumentPageService,
    protected editorInteractionService: EditorInteractionService
  ) {
    this.subscribeToPageChange();
  }

  ngOnInit(): void {
    this.registerToWindowResize();
    this.subscriveToExternalEvents();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowResizeListenerFn);
    this.subs.forEach(s => s.unsubscribe());
    if (this.editorElementChangeSubscription && !this.editorElementChangeSubscription.closed) {
      this.editorElementChangeSubscription.unsubscribe();
    }
  }

  protected abstract subscribeToPageChange(): void;

  protected abstract emitDocumentPageSave(forceNoDebounce?: boolean, ignoreHistory?: boolean): void;
  protected abstract instanciateDocument(elementTypeId: string, data?: EditorElementInstanceData, elementId?: string): ComponentRef<EditorBaseElement>;

  private subscriveToExternalEvents(): void {
    if (this.editorExternalEvent?.eventSubject?.subscribe) {
      this.subs.push(this.editorExternalEvent.eventSubject.subscribe((eventName) => {
        switch (eventName) {
          case 'undo':
            this.undo();
            break;
          case 'redo':
            this.redo();
            break;
          default:
            if (isDevMode()) {
              console.log(`Event emitted to editor named "${eventName}"`);
            }
            break;
        }
      }));
    }
  }

  private registerToWindowResize(): void {
    if (this.visualizeMode) { return; }
    window.addEventListener('resize', this.windowResizeListenerFn);
  }

  public editorDragOver(event: DragEvent): void {
    if (this.visualizeMode) { return; }
    event.preventDefault();
  }

  public editorDropElement(event: DragEvent): void {
    event.preventDefault();
    if (this.visualizeMode) { return; }
    const elementId = event.dataTransfer.getData('text/plain');
    const isAnElementId = typeof elementId === 'string' && this.editorElementsManagerService.getEditorElementDefinition(elementId);
    if (!isAnElementId) {
      // Treat files dropped in editor
      const fileList = event.dataTransfer.files;
      const isAFileList = fileList?.length;
      if (isAFileList) {
        const imageTypeRegex = /image\/[a-z]{1,}/;
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          if (!imageTypeRegex.test(file.type)) {
            continue;
          }
          ImageUtils.getBase64ImageFromFile(file)
            .then((base64Image) => {
              const instanceData = new EditorElementInstanceData({
                frameProperties: { left: `${event?.offsetX}px`, top: `${event?.offsetY}px`, },
                data: { image: base64Image }
              });
              this.instanciateDocument('wb-image', instanceData);
              this.emitDocumentPageSave(true);
            })
            .catch(error => {
              if (isDevMode()) {
                console.error(error)
              }
            });
        }
      }
      // Treat text dropped in editor
      if (elementId && typeof elementId === 'string' && !this.editorElementsManagerService.getEditorElementDefinition(elementId)) {
        const dataText = elementId;
        const instanceData = new EditorElementInstanceData({
          frameProperties: { left: `${event?.offsetX}px`, top: `${event?.offsetY}px`, },
          data: { text: dataText }
        });
        this.instanciateDocument('wb-text', instanceData);
        this.emitDocumentPageSave(true);
        return;
      }
      return;
    }

    const instanceData = new EditorElementInstanceData({
      frameProperties: { left: `${event?.offsetX}px`, top: `${event?.offsetY}px` }
    });

    this.instanciateDocument(elementId, instanceData);
    this.emitDocumentPageSave(true);
  }

  protected updateExternalEventData(): void {
    if (this.editorExternalEvent) {
      this.editorExternalEvent.hasUndo = this.editorHistory.hasUndo();
      this.editorExternalEvent.hasRedo = this.editorHistory.hasRedo();
    }
  }

  protected undo(): void {
    if (!this.editorHistory.hasUndo()) { return; }
    const data = this.editorHistory.undo();
    this.instanciateElementsFromData(data);
    this.emitDocumentPageSave(false, true);
    this.updateExternalEventData();
  }

  protected redo(): void {
    if (!this.editorHistory.hasRedo()) { return; }
    const data = this.editorHistory.redo();
    this.instanciateElementsFromData(data);
    this.emitDocumentPageSave(false, true);
    this.updateExternalEventData();
  }

  protected instanciateElementsFromData(data: EditorElementHistoryData[]): void {
    if (this.editorElements.length) {
      this.resetEditorElements();
    }

    const pageDataIndex = data.findIndex(d => d.elementTypeId === 'page');
    if (pageDataIndex !== -1) {
      this.editorDocumentPageInstanceService.setData(data[pageDataIndex]?.instanceData?.data as EditorDocumentPageInstanceData);
      data.splice(pageDataIndex, 1);
    } else {
      this.editorDocumentPageInstanceService.setData(undefined);
    }
    data.forEach(e => {
      this.instanciateDocument(e.elementTypeId, e.instanceData, e.elementId);
    });
    this.editorElement.selectedElementIds = [];
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
