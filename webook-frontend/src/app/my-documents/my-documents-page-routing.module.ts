import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyDocumentsPageComponent } from './my-documents-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyDocumentsPageComponent,
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
export class HomePageRoutingModule { }
