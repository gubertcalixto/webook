import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/fa-icons/fa-icons.module';
import { TccEditorBaseComponentsModule } from '@tcc-editor-base-components/tcc-editor-base-components.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import {
  TccEditorElementProjectionComponent,
} from './tcc-editor-element-projection/tcc-editor-element-projection.component';
import {
  TccEditorElementProjectionDirective,
} from './tcc-editor-element-projection/tcc-editor-element-projection.directive';
import { TccEditorPropertiesComponent } from './tcc-editor-properties/tcc-editor-properties.component';
import { TccEditorToolboxComponent } from './tcc-editor-toolbox/tcc-editor-toolbox.component';
import { TccEditorComponent } from './tcc-editor.component';
import { TccEditorService } from './tcc-editor.service';

@NgModule({
  declarations: [
    TccEditorComponent,
    TccEditorElementProjectionComponent,
    TccEditorElementProjectionDirective,
    TccEditorToolboxComponent,
    TccEditorPropertiesComponent
  ],
  imports: [
    CommonModule,
    FaIconsModule,
    AngularDraggableModule,
    NzButtonModule,

    TccEditorBaseComponentsModule,
    NzLayoutModule
  ],
  providers: [TccEditorService],
  exports: [TccEditorComponent]
})
export class TccEditorModule {
}
