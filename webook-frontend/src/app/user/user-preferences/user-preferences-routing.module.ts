import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath-guards/must-be-logged.guard';

import { UserPreferencesComponent } from './user-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: UserPreferencesComponent,
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
export class UserPreferencesRoutingModule { }
