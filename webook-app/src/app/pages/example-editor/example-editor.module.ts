import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleEditorComponent } from './example-editor.component';
import {TccEditorModule} from '@tcc-editor/tcc-editor.module';
import {ExampleEditorRoutingModule} from './example-editor-routing.module';

@NgModule({
  declarations: [ExampleEditorComponent],
  imports: [
    CommonModule,
    TccEditorModule,
    ExampleEditorRoutingModule
  ]
})
export class ExampleEditorModule { }
