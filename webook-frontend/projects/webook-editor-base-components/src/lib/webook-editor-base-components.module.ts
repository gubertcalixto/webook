import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@webook-shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TextEditorElementComponent } from './text-editor-element/text-editor-element.component';

@NgModule({
  declarations: [TextEditorElementComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    FaIconsModule
  ],
  entryComponents: [TextEditorElementComponent],
  exports: [TextEditorElementComponent]
})
export class WebookEditorBaseComponentsModule { }
