import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SliderPropertiesModule } from './slider-properties/slider-properties.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderPropertiesModule
  ],
  exports: [
    SliderPropertiesModule
  ],
})
export class ElementPropertiesModule { }
