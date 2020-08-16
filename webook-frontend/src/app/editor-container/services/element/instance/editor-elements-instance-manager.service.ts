import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { Frame } from 'scenejs';
import { EditorComponent } from 'src/app/editor-container/components/editor/editor.component';
import {
  EditorElementInstanceData,
} from 'src/app/editor-container/tokens/classes/element/instance/editor-element-instance-data.class';

import { EditorElementsDefinitionManagerService } from '../definition/editor-elements-definition-manager.service';

@Injectable()
export class EditorElementsInstanceManagerService {
  public editor: EditorComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private definitionManagerService: EditorElementsDefinitionManagerService,
  ) { }

  public instanciateElement(
    elementId: string,
    containerRef: ViewContainerRef,
    data?: EditorElementInstanceData
  ) {
    const elementToInstanciate = this.definitionManagerService.getEditorElementDefinition(elementId);
    if (!elementToInstanciate?.elementClass) { return; }
    const normalizedData = new EditorElementInstanceData(data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(elementToInstanciate.elementClass);
    const componentRef = containerRef.createComponent(componentFactory);
    if (componentRef.instance) {
      componentRef.instance.frame = new Frame(normalizedData.frameProperties);
      componentRef.instance.data = normalizedData.data;
      componentRef.instance.editor = this.editor;
    }
    return componentRef;
  }
}
