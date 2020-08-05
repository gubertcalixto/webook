import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import { EditorElementDefinition } from '../../tokens/classes/element/definition/editor-element-definition.class';
import {
  EDITOR_TOOLBOX_DEFAULT_DRAG_PREVIEW_SPACE_X,
  EDITOR_TOOLBOX_DEFAULT_DRAG_PREVIEW_SPACE_Y,
} from './tokens/consts/editor-toolbox-default.const';

@Component({
  selector: 'wb-editor-toolbox',
  templateUrl: './editor-toolbox.component.html',
  styleUrls: ['./editor-toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorToolboxComponent {
  private internalIsToolboxExpanded = false;

  @Input() public items: EditorElementDefinition[];

  @HostBinding('class.expanded') @Input() public get isToolboxExpanded() {
    return this.internalIsToolboxExpanded;
  }
  public set isToolboxExpanded(value) {
    this.internalIsToolboxExpanded = value;
    this.isToolboxExpandedChange.next(value);
  }
  @Output() public isToolboxExpandedChange = new EventEmitter<boolean>();

  constructor(private editorElementsManagerService: EditorElementsDefinitionManagerService) { }

  public toggleToolbox(): void {
    this.isToolboxExpanded = !this.isToolboxExpanded;
  }

  public itemDragStart(item: EditorElementDefinition, event: DragEvent): void {
    event.dataTransfer.setData('text/plain', item.elementId);
    const image = this.editorElementsManagerService.getImagePreview(item.elementId);
    if (image) {
      event.dataTransfer.setDragImage(
        image,
        EDITOR_TOOLBOX_DEFAULT_DRAG_PREVIEW_SPACE_X,
        EDITOR_TOOLBOX_DEFAULT_DRAG_PREVIEW_SPACE_Y
      );
    }
  }

}
