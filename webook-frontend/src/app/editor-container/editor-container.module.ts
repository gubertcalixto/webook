import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';

import { EditorContainerComponent } from './components/editor-container/editor-container.component';
import { EditorHeaderModule } from './components/editor-header/editor-header.module';
import { EditorPageComponent } from './components/editor-page/editor-page.component';
import { EditorPageService } from './components/editor-page/editor-page.service';
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
    EditorPageComponent,
  ],
  imports: [
    CommonModule,
    FaIconsModule,
    EditorComponentsModule,
    EditorHeaderModule,

    NgxMoveableModule,
    NgxSelectoModule,

    NzToolTipModule,

    EditorContainerRoutingModule
  ],
  providers: [
    EditorPageService,
    EditorElementsDefinitionManagerService,
    EditorElementsInstanceManagerService,
    EditorInteractionService
  ]
})
export class EditorContainerModule { }
