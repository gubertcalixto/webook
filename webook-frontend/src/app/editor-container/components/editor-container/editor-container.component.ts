import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { merge, Subscription } from 'rxjs';
import { DocumentOutput } from 'src/app/client/webook';
import { EditorDocumentPageService } from 'src/app/editor-container/services/document-page.service';

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

@Component({
  selector: 'wb-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss']
})
export class EditorContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _pageIndex = 1;

  @ViewChild('editor', { static: false }) private editorElement: EditorComponent;
  @ViewChild('editorContainer', { read: ViewContainerRef }) editorContainer: ViewContainerRef;
  @Input() public document: DocumentOutput;
  @Input() public visualizeMode = false;

  @Input()
  public get pageIndex() { return this._pageIndex; }
  public set pageIndex(value) {
    this._pageIndex = value;
    this.getDocumentPage();
  }
  @Output() public pageIndexChange = new EventEmitter<number>();

  private subs: Subscription[] = [];
  private windowResizeListenerFn = () => { this.editorElements.forEach(element => { element.instance?.updateFrame(); }); };
  private editorElementChangeSubscription: Subscription;
  public editorShortcuts: ShortcutInput[] = [
    { key: ['del', 'backspace'], command: () => { this.deleteEditorSelectedElements(); } },
    { key: 'ctrl + z', command: () => { this.undo(); } },
  ];
  public editorHistory = new EditorHistoryManager();
  public editorElements: ComponentRef<EditorBaseElement>[] = [];
  public get toolboxItems() {
    return this.editorElementsManagerService?.items;
  }

  constructor(
    private editorElementsManagerService: EditorElementsDefinitionManagerService,
    private instanceManagerService: EditorElementsInstanceManagerService,
    private documentPageService: EditorDocumentPageService,
    private editorInteractionService: EditorInteractionService
  ) { }

  ngOnInit(): void {
    this.registerToWindowResize();
  }

  ngAfterViewInit(): void {
    this.instanceManagerService.editor = this.editorElement;
    this.editorInteractionService.init(this, this.editorElement);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowResizeListenerFn);
    this.editorInteractionService.destroyInstance();
    this.subs.forEach(s => s.unsubscribe());
  }

  private getDocumentPage(): void {
    this.resetEditorElements();
    this.subs.push(this.documentPageService.getPage(this.document.id, this.pageIndex).subscribe(result => {
      if (result?.pageData) {
        const data: EditorElementHistoryData[] = JSON.parse(result.pageData);
        data.forEach(e => {
          this.instanciateDocument(e.elementTypeId, e.instanceData, e.elementId);
        });
      }
    }));
  }

  private resetEditorElements(): void {
    this.editorElements.forEach(elements => {
      elements.destroy();
    });
    this.editorElements = [];
  }

  private registerToWindowResize(): void {
    if (this.visualizeMode) { return; }
    window.addEventListener('resize', this.windowResizeListenerFn);
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

  private instanciateDocument(elementTypeId: string, data?: EditorElementInstanceData, elementId?: string): void {
    this.editorElements.push(this.instanceManagerService.instanciateElement(
      elementTypeId,
      this.editorContainer,
      data,
      elementId
    ));
    this.subscribeToElementChanges();
  }

  public editorDragOver(event: DragEvent): void {
    if (this.visualizeMode) { return; }
    event.preventDefault();
  }

  private deleteEditorSelectedElements(): void {
    const selectedIds = this.editorElement.selectedElementIds;
    if (selectedIds.length === 0) {
      return;
    }
    const elementRefs = this.editorElements.filter(e => selectedIds.includes(e.instance?.elementId));
    elementRefs.forEach(element => {
      element.destroy();
    });
    this.editorElements = [...this.editorElements.filter(e => !selectedIds.includes(e.instance?.elementId))];
    this.editorElement.selectedElementIds = [];
    this.emitDocumentPageSave();
  }

  private undo(): void {
    // TODO
    console.log('Undo last action');
  }

  private subscribeToElementChanges(): void {
    if (this.visualizeMode) { return; }
    if (this.editorElementChangeSubscription) {
      this.editorElementChangeSubscription.unsubscribe();
    }
    this.editorElementChangeSubscription = merge(...this.editorElements.map(e => e.instance.change)).subscribe((elementId: string) => {
      this.emitDocumentPageSave();
    })
  }

  private emitDocumentPageSave(forceNoDebounce = false) {
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
  }
}
