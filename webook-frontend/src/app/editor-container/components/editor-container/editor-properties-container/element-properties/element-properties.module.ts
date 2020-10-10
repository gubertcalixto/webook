import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxPropertiesModule } from './checkbox-properties/checkbox-properties.module';
import { ImagePropertiesModule } from './image-properties/image-properties.module';
import { RadioPropertiesModule } from './radio-properties/radio-properties.module';
import { RectanglePropertiesModule } from './rectangle-properties/rectangle-properties.module';
import { SliderPropertiesModule } from './slider-properties/slider-properties.module';
import { TextPropertiesModule } from './text-properties/text-properties.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderPropertiesModule,
    RectanglePropertiesModule,
    CheckboxPropertiesModule,
    RadioPropertiesModule,
    ImagePropertiesModule,
    TextPropertiesModule
  ],
  exports: [
    SliderPropertiesModule,
    RectanglePropertiesModule,
    CheckboxPropertiesModule,
    RadioPropertiesModule,
    ImagePropertiesModule,
    TextPropertiesModule
  ],
})
export class ElementPropertiesModule { }
