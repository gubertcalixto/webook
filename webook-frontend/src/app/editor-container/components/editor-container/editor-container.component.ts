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
import { merge, Subscription } from 'rxjs';
import { EditorDocument } from 'src/app/client/webook';
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
  @ViewChild('editor', { static: false }) private editorElement: EditorComponent;
  @ViewChild('editorContainer', { read: ViewContainerRef }) editorContainer: ViewContainerRef;
  @Input() public document: EditorDocument;
  @Input() public visualizeMode = false;
  @Input() public pageIndex = 1;
  @Output() public pageIndexChange = new EventEmitter<number>();

  private subs: Subscription[] = [];
  private windowResizeListenerFn = () => { this.editorElements.forEach(element => { element.instance?.updateFrame(); }); };
  private editorElementChangeSubscription: Subscription;
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
    this.getDocumentPage();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowResizeListenerFn);
    this.subs.forEach(s => s.unsubscribe());
  }

  private getDocumentPage(): void {
    this.subs.push(this.documentPageService.getPage(this.document.id, this.pageIndex).subscribe(result => {
      if (result?.pageData) {
        const data: EditorElementHistoryData[] = JSON.parse(result.pageData);
        data.forEach(e => {
          this.instanciateDocument(e.elementId, e.instanceData);
        });
      }
    }));
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
  }

  private instanciateDocument(elementId: string, data?: EditorElementInstanceData): void {
    this.editorElements.push(this.instanceManagerService.instanciateElement(
      elementId,
      this.editorContainer,
      data
    ));
    this.subscribeToElementChanges();
  }

  public editorDragOver(event: DragEvent): void {
    if (this.visualizeMode) { return; }
    event.preventDefault();
  }

  private subscribeToElementChanges(): void {
    if (this.visualizeMode) { return; }
    if (this.editorElementChangeSubscription) {
      this.editorElementChangeSubscription.unsubscribe();
    }
    this.editorElementChangeSubscription = merge(...this.editorElements.map(e => e.instance.change)).subscribe((elementId: string) => {
      const data: EditorElementHistoryData[] = this.editorElements.map(el => {
        return {
          elementId: el.instance.elementTypeId,
          instanceData: {
            frameProperties: el.instance?.frame.raw(),
            data: el.instance?.data
          }
        }
      });
      this.documentPageService.savePage(this.document.id, this.pageIndex, data);
    })
  }
}
