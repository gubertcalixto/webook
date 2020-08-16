import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';

import { EditorTextElementComponent } from './editor-text-element/editor-text-element.component';

@NgModule({
  declarations: [
    EditorTextElementComponent
  ],
  imports: [
    CommonModule,
    FaIconsModule,

    NgxMoveableModule,
    NgxSelectoModule,

    NzInputModule,
    NzButtonModule
  ],
  exports: [
    EditorTextElementComponent
  ],
})
export class EditorComponentsModule { }
