import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath/consts/guards/must-be-logged.guard';

import { EditorPageComponent } from './components/editor-page/editor-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditorPageComponent,
    canActivate: [MustBeLoggedAuthGuard]
  },
  {
    path: ':id',
    component: EditorPageComponent,
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
