import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ColorPickerModule } from 'ngx-color-picker';

import { RectanglePropertiesComponent } from './rectangle-properties.component';

@NgModule({
  declarations: [RectanglePropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ColorPickerModule,

    NzCheckboxModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTypographyModule,
  ],
  exports: [RectanglePropertiesComponent],
})
export class RectanglePropertiesModule { }
