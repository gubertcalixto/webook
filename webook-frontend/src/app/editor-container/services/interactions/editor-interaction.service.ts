import { Injectable, OnDestroy } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EditorObjectTypeEnum } from 'src/app/client/webook';

import { EditorContainerComponent } from '../../components/editor-container/editor-container.component';
import {
  EditorCommentSidebarComponent,
} from '../../components/editor-interactions/editor-comment-sidebar/editor-comment-sidebar.component';
import {
  EditorBaseElement,
} from '../../components/editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorComponent } from '../../components/editor/editor.component';
import { EditorInteractionSelectedElementData } from './editor-interaction-selected-element-data';

@Injectable()
export class EditorInteractionService implements OnDestroy {
  private subs: Subscription[] = [];
  private editor: EditorComponent;
  private editorContainer: EditorContainerComponent;
  private hasAlreadyStarted = false;
  public currentSelectedElementData: EditorInteractionSelectedElementData;
  public currentSelectedElementDataSubject = new BehaviorSubject<EditorInteractionSelectedElementData>(undefined);

  constructor(private drawerService: NzDrawerService) { }

  ngOnDestroy(): void {
    this.destroyInstance();
  }

  public init(editorContainer: EditorContainerComponent, editor: EditorComponent): void {
    if (this.hasAlreadyStarted) {
      return;
    }
    this.editorContainer = editorContainer;
    this.editor = editor;
    this.hasAlreadyStarted = true;
    this.editor.selectedElementIdsSubject.subscribe(() => {
      this.updateSelectedElement();
    });
  }

  public destroyInstance(): void {
    this.hasAlreadyStarted = false;
    this.editor = undefined;
    this.editorContainer = undefined;
    this.currentSelectedElementData = undefined;
    this.currentSelectedElementDataSubject = new BehaviorSubject<EditorInteractionSelectedElementData>(undefined);
    this.subs.forEach(s => s.unsubscribe());
  }

  public openCommentPanel(objectTypeEnum: EditorObjectTypeEnum, objectId: string, title?: string): NzDrawerRef<any> {
    return this.drawerService.create<EditorCommentSidebarComponent>({
      nzTitle: title || 'Comentários',
      nzContent: EditorCommentSidebarComponent,
      nzWrapClassName: 'editor-comment-container',
      nzContentParams: {
        objectTypeEnum,
        objectId
      }
    });
  }

  private getEditorElementById(elementId: string): EditorBaseElement {
    return this.editorContainer.editorElements.find(e => e.instance.elementId === elementId)?.instance;
  }

  private emitSelectElementData(elementData: EditorInteractionSelectedElementData): void {
    this.currentSelectedElementData = elementData;
    this.currentSelectedElementDataSubject.next(this.currentSelectedElementData);
  }

  private updateSelectedElement(): void {
    const isNoneSelected = this.editor.selectedElementIds.length === 0;
    const isMultiSelected = this.editor.selectedElementIds.length > 1;
    const elementInstance = this.editor.selectedElementIds.length === 1
      ? this.getEditorElementById(this.editor.selectedElementIds[0])
      : undefined;
    const elementType = elementInstance
      ? elementInstance.elementTypeId
      : undefined;
    const elementData = new EditorInteractionSelectedElementData(elementInstance, elementType, isMultiSelected, isNoneSelected);
    this.emitSelectElementData(elementData);
  }
}
