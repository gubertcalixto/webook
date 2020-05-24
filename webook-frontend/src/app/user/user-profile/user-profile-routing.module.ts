import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath-guards/must-be-logged.guard';

import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: UserProfileComponent,
    canActivate: [MustBeLoggedAuthGuard]
  },
  {
    path: ':id',
    component: UserProfileComponent
  },
  {
    path: '**',
    redirectTo: 'my-profile'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
