import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: {
      title: 'Cadastro'
    }
  },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
