import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { SliderPropertiesComponent } from './slider-properties.component';

@NgModule({
  declarations: [
    SliderPropertiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzCheckboxModule,
    NzInputNumberModule,
    NzTypographyModule
  ],
  exports: [
    SliderPropertiesComponent
  ],
})
export class SliderPropertiesModule { }
