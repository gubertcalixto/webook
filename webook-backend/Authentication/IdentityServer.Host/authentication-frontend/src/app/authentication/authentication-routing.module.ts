import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
      title: 'Cadastro',
    }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    data: {
      title: 'Esqueceu a senha'
    }
  },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
