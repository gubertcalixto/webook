import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorDocumentComponent } from './editor-document.component';

const routes: Routes = [
  { path: '', component: EditorDocumentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorDocumentRoutingModule { }
