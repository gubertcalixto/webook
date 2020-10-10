import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';

import { EditorCheckboxElementComponent } from './editor-checkbox-element/editor-checkbox-element.component';
import { EditorImageElementComponent } from './editor-image-element/editor-image-element.component';
import { EditorRadioElementComponent } from './editor-radio-element/editor-radio-element.component';
import { EditorRectangleElementComponent } from './editor-rectangle-element/editor-rectangle-element.component';
import { EditorSliderElementComponent } from './editor-slider-element/editor-slider-element.component';
import { EditorTextElementComponent } from './editor-text-element/editor-text-element.component';

@NgModule({
  declarations: [
    EditorTextElementComponent,
    EditorSliderElementComponent,
    EditorRadioElementComponent,
    EditorRectangleElementComponent,
    EditorImageElementComponent,
    EditorCheckboxElementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NgxMoveableModule,
    NgxSelectoModule,

    NzUploadModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzSliderModule,
    NzCheckboxModule,
    NzRadioModule,
  ],
  exports: [
    EditorTextElementComponent,
    EditorSliderElementComponent,
    EditorRadioElementComponent,
    EditorRectangleElementComponent,
    EditorImageElementComponent,
    EditorCheckboxElementComponent,
  ],
})
export class EditorComponentsModule { }
