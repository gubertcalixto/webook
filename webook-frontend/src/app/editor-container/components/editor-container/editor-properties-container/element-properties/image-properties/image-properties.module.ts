import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ColorPickerModule } from 'ngx-color-picker';

import { ImagePropertiesComponent } from './image-properties.component';

@NgModule({
  declarations: [ImagePropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    ColorPickerModule,

    NzButtonModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzToolTipModule,
    NzTypographyModule,
  ],
  exports: [ImagePropertiesComponent],
})
export class ImagePropertiesModule { }
