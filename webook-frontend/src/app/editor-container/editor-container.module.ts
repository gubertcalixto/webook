import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';

import { EditorContainerComponent } from './components/editor-container/editor-container.component';
import { EditorToolboxComponent } from './components/editor-toolbox/editor-toolbox.component';
import { EditorComponentsModule } from './components/editor/editor-components/editor-components.module';
import { EditorComponent } from './components/editor/editor.component';
import { EditorContainerRoutingModule } from './editor-container-routing.module';
import {
  EditorElementsDefinitionManagerService,
} from './services/element/definition/editor-elements-definition-manager.service';
import { EditorElementsInstanceManagerService } from './services/element/instance/editor-elements-instance-manager.service';
import { EditorInteractionService } from './services/interactions/editor-interaction.service';

@NgModule({
  declarations: [
    EditorContainerComponent,
    EditorToolboxComponent,
    EditorComponent,
  ],
  imports: [
    CommonModule,
    FaIconsModule,
    EditorComponentsModule,

    NgxMoveableModule,
    NgxSelectoModule,

    NzToolTipModule,

    EditorContainerRoutingModule
  ],
  providers: [
    EditorElementsDefinitionManagerService,
    EditorElementsInstanceManagerService,
    EditorInteractionService
  ]
})
export class EditorContainerModule { }
