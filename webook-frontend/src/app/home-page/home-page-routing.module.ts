import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath-guards/must-be-logged.guard';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
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
export class HomePageRoutingModule { }
