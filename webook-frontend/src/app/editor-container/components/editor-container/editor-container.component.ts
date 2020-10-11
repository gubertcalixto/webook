import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DocumentOutput } from 'src/app/client/webook';

import { EditorDocumentPageService } from '../../services/document-page.service';
import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import {
  EditorElementsInstanceManagerService,
} from '../../services/element/instance/editor-elements-instance-manager.service';
import { EditorInteractionService } from '../../services/interactions/editor-interaction.service';
import { IEditorExternalEvent } from '../../tokens/classes/editor-external-event.interface';
import { EditorElementInstanceData } from '../../tokens/classes/element/instance/editor-element-instance-data.class';
import { EditorElementHistoryData } from '../../tokens/classes/history/editor-history-pre-serialize.class';
import { EditorBaseElement } from '../editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorComponent } from '../editor/editor.component';
import { EditorContainerClipboardBaseComponent } from './editor-container-clipboard-base.component';

@Component({
  selector: 'wb-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss']
})
export class EditorContainerComponent extends EditorContainerClipboardBaseComponent implements AfterViewInit, OnDestroy {
  private _pageIndex = 1;
  private onSavePageSubscription: Subscription;

  @ViewChild('editor', { static: false }) protected editorElement: EditorComponent;
  @ViewChild('editorContainer', { read: ViewContainerRef }) editorContainer: ViewContainerRef;
  @Input() public document: DocumentOutput;
  @Input() public visualizeMode = false;
  @Input() public editorExternalEvent: IEditorExternalEvent;

  @Input()
  public get pageIndex() { return this._pageIndex; }
  public set pageIndex(value) {
    this._pageIndex = value;
    this.getDocumentPage();
  }
  @Output() public pageIndexChange = new EventEmitter<number>();

  public editorShortcuts: ShortcutInput[] = [
    { key: ['del', 'backspace'], command: () => { this.deleteEditorSelectedElements(); } },
    { key: 'ctrl + z', command: () => { this.undo(); } },
    { key: 'ctrl + y', command: () => { this.redo(); } },
    { key: 'ctrl + x', command: () => { this.cut(); } },
    { key: 'ctrl + c', command: () => { this.copy(); } },
    { key: 'ctrl + v', command: () => { this.paste(); } },
    { key: 'ctrl + a', command: (event) => { this.selectAllElements(event); } },
  ];

  constructor(
    editorElementsManagerService: EditorElementsDefinitionManagerService,
    instanceManagerService: EditorElementsInstanceManagerService,
    documentPageService: EditorDocumentPageService,
    editorInteractionService: EditorInteractionService
  ) {
    super(editorElementsManagerService, instanceManagerService, documentPageService, editorInteractionService);
  }

  ngAfterViewInit(): void {
    this.instanceManagerService.editor = this.editorElement;
    this.editorInteractionService.init(this, this.editorElement);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.editorInteractionService.destroyInstance();
    if (this.onSavePageSubscription && !this.onSavePageSubscription.closed) {
      this.onSavePageSubscription.unsubscribe();
    }
  }

  private getDocumentPage(): void {
    this.resetEditorElements();
    this.subs.push(this.documentPageService.getPage(this.document.id, this.pageIndex).subscribe(result => {
      if (result?.pageData) {
        const data: EditorElementHistoryData[] = JSON.parse(result.pageData);
        this.instanciateElementsFromData(data);
        this.editorHistory.reset(data);
      }
    }));
  }

  protected instanciateDocument(elementTypeId: string, data?: EditorElementInstanceData, elementId?: string): ComponentRef<EditorBaseElement> {
    const addedElement = this.instanceManagerService.instanciateElement(
      elementTypeId,
      this.editorContainer,
      data,
      elementId
    );
    this.editorElements.push(addedElement);
    this.subscribeToElementChanges();
    if (addedElement.instance?.elementId) {
      this.editorElement.selectedElementIds = [addedElement.instance.elementId];
    }
    return addedElement;
  }

  protected emitDocumentPageSave(forceNoDebounce = false, ignoreHistory = false) {
    const data: EditorElementHistoryData[] = this.editorElements.map(el => {
      return {
        elementId: el.instance?.elementId,
        elementTypeId: el.instance?.elementTypeId,
        instanceData: {
          frameProperties: el.instance?.frame.raw(),
          data: el.instance?.data
        }
      };
    });
    this.documentPageService.savePage(this.document.id, this.pageIndex, data, forceNoDebounce);
    if (this.onSavePageSubscription && !this.onSavePageSubscription.closed) {
      this.onSavePageSubscription.unsubscribe();
    }
    this.onSavePageSubscription = this.documentPageService.savedPageSubject.pipe(first()).subscribe(res => {
      if (!ignoreHistory) {
        this.editorHistory.append(data);
        this.updateExternalEventData();
      }
    })
  }

  private selectAllElements(event?: ShortcutEventOutput): void {
    if (!this.editorElement.isFocused) { return; }

    const ids = this.editorElements.map(el => el.instance.elementId);
    this.editorElement.selectedElementIds = ids;
    event?.event?.preventDefault();
  }
}
