import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ColorPickerModule } from 'ngx-color-picker';

import { EditorPropertiesContainerComponent } from './editor-properties-container.component';
import { EditorPagePropertiesModule } from './page-properties/page-properties.module';

@NgModule({
  declarations: [EditorPropertiesContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    FaIconsModule,

    EditorPagePropertiesModule,

    ColorPickerModule,
    NzUploadModule,
    NzTypographyModule
  ],
  exports: [EditorPropertiesContainerComponent],
})
export class EditorPropertiesContainerModule { }
