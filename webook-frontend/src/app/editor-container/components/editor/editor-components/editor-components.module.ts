import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';
import { TCC_GIPHY_API_KEY, TccGiphyModule } from 'projects/legacy-projects/tcc-giphy/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { EditorCarouselElementComponent } from './editor-carousel-element/editor-carousel-element.component';
import { EditorCheckboxElementComponent } from './editor-checkbox-element/editor-checkbox-element.component';
import { EditorElipseElementComponent } from './editor-elipse-element/editor-elipse-element.component';
import { EditorGiphyElementComponent } from './editor-giphy-element/editor-giphy-element.component';
import { EditorImageElementComponent } from './editor-image-element/editor-image-element.component';
import { EditorPixabayElementComponent } from './editor-pixabay-element/editor-pixabay-element.component';
import { EditorRadioElementComponent } from './editor-radio-element/editor-radio-element.component';
import { EditorRectangleElementComponent } from './editor-rectangle-element/editor-rectangle-element.component';
import { EditorSliderElementComponent } from './editor-slider-element/editor-slider-element.component';
import { EditorTextElementComponent } from './editor-text-element/editor-text-element.component';
import { EditorYoutubeElementComponent } from './editor-youtube-element/editor-youtube-element.component';

@NgModule({
  declarations: [
    EditorTextElementComponent,
    EditorSliderElementComponent,
    EditorRadioElementComponent,
    EditorRectangleElementComponent,
    EditorElipseElementComponent,
    EditorImageElementComponent,
    EditorCheckboxElementComponent,
    EditorCarouselElementComponent,
    EditorGiphyElementComponent,
    EditorPixabayElementComponent,
    EditorYoutubeElementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,
    NgxMoveableModule,
    NgxSelectoModule,

    YouTubePlayerModule,
    NzUploadModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzSliderModule,
    NzSpinModule,
    NzCheckboxModule,
    NzRadioModule,
    NzCarouselModule,
    TccGiphyModule,
    NzEmptyModule,
  ],
  providers: [{ provide: TCC_GIPHY_API_KEY, useValue: authKeys.giphy.authKey }],
  exports: [
    EditorTextElementComponent,
    EditorSliderElementComponent,
    EditorRadioElementComponent,
    EditorRectangleElementComponent,
    EditorElipseElementComponent,
    EditorImageElementComponent,
    EditorCheckboxElementComponent,
    EditorCarouselElementComponent,
    EditorGiphyElementComponent,
    EditorYoutubeElementComponent,
  ],
})
export class EditorComponentsModule { }
