import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselPropertiesModule } from './carousel-properties/carousel-properties.module';
import { CheckboxPropertiesModule } from './checkbox-properties/checkbox-properties.module';
import { GiphyPropertiesModule } from './giphy-properties/giphy-properties.module';
import { ImagePropertiesModule } from './image-properties/image-properties.module';
import { PixabayPropertiesModule } from './pixabay-properties/pixabay-properties.module';
import { RadioPropertiesModule } from './radio-properties/radio-properties.module';
import { RectanglePropertiesModule } from './rectangle-properties/rectangle-properties.module';
import { SliderPropertiesModule } from './slider-properties/slider-properties.module';
import { TextPropertiesModule } from './text-properties/text-properties.module';
import { YoutubePropertiesModule } from './youtube-properties/youtube-properties.module';

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
    TextPropertiesModule,
    GiphyPropertiesModule,
    PixabayPropertiesModule,
    CarouselPropertiesModule,
    YoutubePropertiesModule,
  ],
  exports: [
    SliderPropertiesModule,
    RectanglePropertiesModule,
    CheckboxPropertiesModule,
    RadioPropertiesModule,
    ImagePropertiesModule,
    TextPropertiesModule,
    GiphyPropertiesModule,
    PixabayPropertiesModule,
    CarouselPropertiesModule,
    YoutubePropertiesModule,
  ],
})
export class ElementPropertiesModule { }
