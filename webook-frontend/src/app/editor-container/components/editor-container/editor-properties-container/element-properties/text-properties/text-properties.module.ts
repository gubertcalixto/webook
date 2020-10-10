import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ColorPickerModule } from 'ngx-color-picker';

import { TextPropertiesComponent } from './text-properties.component';

@NgModule({
  declarations: [TextPropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ColorPickerModule,

    NzInputModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzToolTipModule,
    NzSelectModule,
    NzTypographyModule,
  ],
  exports: [TextPropertiesComponent],
})
export class TextPropertiesModule { }
