import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExampleEditorComponent} from './example-editor.component';

const routes: Routes = [
  { path: '', component: ExampleEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleEditorRoutingModule { }
