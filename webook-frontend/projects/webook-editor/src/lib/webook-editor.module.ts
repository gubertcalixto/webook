import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WebookEditorBaseComponentsModule } from '@webook-editor-base-components/webook-editor-base-components.module';
import { FaIconsModule } from '@webook-shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import {
  WebookEditorElementProjectionComponent,
} from './webook-editor-element-projection/webook-editor-element-projection.component';
import {
  WebookEditorElementProjectionDirective,
} from './webook-editor-element-projection/webook-editor-element-projection.directive';
import { WebookEditorToolboxComponent } from './webook-editor-toolbox/webook-editor-toolbox.component';
import { WebookEditorComponent } from './webook-editor.component';
import { WebookEditorService } from './webook-editor.service';

@NgModule({
  declarations: [
    WebookEditorComponent,
    WebookEditorElementProjectionComponent,
    WebookEditorElementProjectionDirective,
    WebookEditorToolboxComponent
  ],
  imports: [
    CommonModule,
    FaIconsModule,
    NzButtonModule,
    WebookEditorBaseComponentsModule,
    NzLayoutModule
  ],
  providers: [WebookEditorService],
  exports: [WebookEditorComponent]
})
export class WebookEditorModule {
}
