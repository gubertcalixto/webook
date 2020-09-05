import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ColorPickerModule } from 'ngx-color-picker';

import { PagePropertiesComponent } from './page-properties.component';

@NgModule({
  declarations: [PagePropertiesComponent],
  imports: [
    CommonModule,
    FaIconsModule,

    ColorPickerModule,
    NzUploadModule,
    NzTypographyModule
  ],
  exports: [PagePropertiesComponent],
})
export class EditorPagePropertiesModule { }
