import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RectanglePropertiesModule } from './rectangle-properties/rectangle-properties.module';
import { SliderPropertiesModule } from './slider-properties/slider-properties.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderPropertiesModule,
    RectanglePropertiesModule
  ],
  exports: [
    SliderPropertiesModule,
    RectanglePropertiesModule
  ],
})
export class ElementPropertiesModule { }
