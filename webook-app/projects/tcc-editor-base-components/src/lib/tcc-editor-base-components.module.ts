import { NgModule } from '@angular/core';
import { TextEditorElementComponent } from './text-editor-element/text-editor-element.component';
import {CommonModule} from '@angular/common';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FaIconsModule} from '@shared/fa-icons/fa-icons.module';
import { CountdownEditorElementComponent } from './countdown-editor-element/countdown-editor-element.component';

@NgModule({
  declarations: [TextEditorElementComponent, CountdownEditorElementComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    FaIconsModule
  ],
  entryComponents: [TextEditorElementComponent, CountdownEditorElementComponent],
  exports: [TextEditorElementComponent, CountdownEditorElementComponent]
})
export class TccEditorBaseComponentsModule { }
