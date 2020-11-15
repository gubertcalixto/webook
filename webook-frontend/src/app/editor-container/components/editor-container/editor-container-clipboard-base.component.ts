import { NzNotificationService } from 'ng-zorro-antd/notification';

import { EditorDocumentPageInstanceService } from '../../services/document-page-instance.service';
import { EditorDocumentPageService } from '../../services/document-page.service';
import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import {
  EditorElementsInstanceManagerService,
} from '../../services/element/instance/editor-elements-instance-manager.service';
import { EditorInteractionService } from '../../services/interactions/editor-interaction.service';
import { EditorElementInstanceData } from '../../tokens/classes/element/instance/editor-element-instance-data.class';
import {
  DEFAULT_EDITOR_NOTIFICATION_SETTINGS,
  ENABLE_EDITOR_NOTIFICATION,
} from '../../tokens/consts/editor-notifications-settings.const';
import { EditorBaseElement } from '../editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorContainerBaseComponent } from './editor-container-base.component';

export abstract class EditorContainerClipboardBaseComponent extends EditorContainerBaseComponent {
  private copiedElementsData: { elementTypeId: string; data: EditorElementInstanceData }[] = [];

  constructor(
    editorDocumentPageInstanceService: EditorDocumentPageInstanceService,
    editorElementsManagerService: EditorElementsDefinitionManagerService,
    instanceManagerService: EditorElementsInstanceManagerService,
    documentPageService: EditorDocumentPageService,
    editorInteractionService: EditorInteractionService,
    notificationService: NzNotificationService
  ) {
    super(editorDocumentPageInstanceService, editorElementsManagerService, instanceManagerService, documentPageService, editorInteractionService, notificationService);
  }

  private getCopiedDataFromElement(element: EditorBaseElement, keepsSamePosition = false) {
    const getNumberOfPosition = (position: string = '') => {
      const normalizedPosition = Number(position.replace('px', ''));
      return isNaN(normalizedPosition) ? 0 : normalizedPosition;
    }
    const spacingBetweenItems = 5; // px
    const elWidth = getNumberOfPosition(element.frame.get('width')) || element.elementRef.nativeElement.clientWidth;
    const elHeight = getNumberOfPosition(element.frame.get('height')) || element.elementRef.nativeElement.clientHeight;
    let left = getNumberOfPosition(element.frame.get('left'));
    let top = getNumberOfPosition(element.frame.get('top'));
    if (!keepsSamePosition) {
      const maxWidth = this.editorElement.elementRef.nativeElement.scrollWidth;
      const maxHeight = this.editorElement.elementRef.nativeElement.scrollHeight;
      const spacerMultipler = .15;
      if (left + (elWidth * spacerMultipler) + spacingBetweenItems <= maxWidth) {
        left = left + (elWidth * spacerMultipler) + spacingBetweenItems;
      } else if (left - (elWidth * spacerMultipler) - spacingBetweenItems >= 0) {
        left = left - (elWidth * spacerMultipler) - spacingBetweenItems;
      }

      if (top + (elHeight * spacerMultipler) + spacingBetweenItems <= maxHeight) {
        top = top + (elHeight * spacerMultipler) + spacingBetweenItems;
      } else if (top - (elHeight * spacerMultipler) - spacingBetweenItems >= 0) {
        top = top - (elHeight * spacerMultipler) - spacingBetweenItems;
      }
    }

    return {
      elementTypeId: element.elementTypeId,
      data: new EditorElementInstanceData({
        data: element.data ? JSON.parse(JSON.stringify(element.data)) : undefined,
        frameProperties: {
          height: element.frame.get('height'),
          width: element.frame.get('width'),
          left: `${left}px`,
          top: `${top}px`,
          transform: element.frame.get('transform')
        }
      })
    };
  }

  protected deleteEditorSelectedElements(): void {
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

  protected cut(): void {
    if (!this.editorElement.isFocused || this.editorElement.selectedElementIds.length === 0) {
      return;
    }
    this.copy(true, false);
    this.deleteEditorSelectedElements();
    if (ENABLE_EDITOR_NOTIFICATION) {
      this.notificationService.info('Recortado com sucesso', '', DEFAULT_EDITOR_NOTIFICATION_SETTINGS);
    }
  }

  protected copy(keepsSamePosition = false, showNotification = true): void {
    if (!this.editorElement.isFocused) {
      return;
    }

    this.copiedElementsData.splice(0);
    const selectedIds = this.editorElement.selectedElementIds;
    if (selectedIds.length === 0) {
      return;
    }
    const elementRefs = this.editorElements.filter(e => selectedIds.includes(e.instance?.elementId));

    elementRefs.forEach((element) => {
      if (element.instance) {
        this.copiedElementsData.push(this.getCopiedDataFromElement(element.instance, keepsSamePosition));
      }
    });
    navigator.clipboard.writeText('[webook.copiedElements]');
    if (showNotification && ENABLE_EDITOR_NOTIFICATION) {
      this.notificationService.info('Copiado com sucesso', '', DEFAULT_EDITOR_NOTIFICATION_SETTINGS);
    }
  }

  protected paste(): void {
    const clipboardContent = navigator.clipboard.readText();
    clipboardContent.then((copiedContent: string) => {
      if (copiedContent === '[webook.copiedElements]' && this.copiedElementsData.length) {
        this.copiedElementsData.forEach(el => {
          const instanciatedElement = this.instanciateDocument(el.elementTypeId, el.data);
          if (this.copiedElementsData.length === 1) {
            this.editorElement.selectedElementIds = [instanciatedElement.instance.elementId]
          }
        });
        this.emitDocumentPageSave(true);
      }
    });
  }
}
