import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath/consts/guards/must-be-logged.guard';

import { EditorContainerComponent } from './components/editor-container/editor-container.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    canActivate: [MustBeLoggedAuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorContainerRoutingModule { }
