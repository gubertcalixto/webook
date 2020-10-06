import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxPropertiesModule } from './checkbox-properties/checkbox-properties.module';
import { RectanglePropertiesModule } from './rectangle-properties/rectangle-properties.module';
import { SliderPropertiesModule } from './slider-properties/slider-properties.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderPropertiesModule,
    RectanglePropertiesModule,
    CheckboxPropertiesModule
  ],
  exports: [
    SliderPropertiesModule,
    RectanglePropertiesModule,
    CheckboxPropertiesModule
  ],
})
export class ElementPropertiesModule { }
