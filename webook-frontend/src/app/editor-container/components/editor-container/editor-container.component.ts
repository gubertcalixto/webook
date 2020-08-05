import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import {
  EditorElementsDefinitionManagerService,
} from '../../services/element/definition/editor-elements-definition-manager.service';
import {
  EditorElementsInstanceManagerService,
} from '../../services/element/instance/editor-elements-instance-manager.service';
import { EditorElementInstanceData } from '../../tokens/classes/element/instance/editor-element-instance-data.class';
import { EditorHistoryManager } from '../../tokens/classes/history/editor-history-stack.class';
import { EditorBaseElement } from '../editor/editor-components/editor-element-base-classes/editor-base-element';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'wb-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss']
})
export class EditorContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { static: false }) private editorElement: EditorComponent;
  @ViewChild('editorContainer', { read: ViewContainerRef }) editorContainer: ViewContainerRef;
  public editorHistory = new EditorHistoryManager();
  public editorElements: ComponentRef<EditorBaseElement>[] = [];
  public get toolboxItems() {
    return this.editorElementsManagerService?.items;
  }

  constructor(
    private editorElementsManagerService: EditorElementsDefinitionManagerService,
    private instanceManagerService: EditorElementsInstanceManagerService
  ) { }

  ngOnInit(): void {
    const onWindowResize = () => {
      this.editorElements.forEach(element => {
        element.instance?.moveable?.updateRect();
      });
    };
    window.addEventListener('resize', onWindowResize);
  }

  ngAfterViewInit(): void {
    this.instanceManagerService.editor = this.editorElement;
  }

  public editorDropElement(event: DragEvent): void {
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

    this.editorElements.push(this.instanceManagerService.instanciateElement(
      elementId,
      this.editorContainer,
      instanceData
    ));
  }

  public editorDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
