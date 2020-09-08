import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountServiceProxy, ForgotPasswordInput, IdentityLoginInput, RegisterInput } from '../client';

@Injectable()
export class AuthenticationService {
  constructor(private accountServiceProxy: AccountServiceProxy) { }

  public signIn(login: string, password: string, returnUrl: string = null) {
    const user: IdentityLoginInput = { login, password, returnUrl };
    return this.accountServiceProxy.accountLoginPost(user);
  }

  public signUp(id: string, login: string, firstName: string, lastName: string, email: string, password: string) {
    const input: RegisterInput = { id, login, firstName, lastName, email, password };
    return this.accountServiceProxy.accountRegisterPost(input);
  }

  public requestForgotPassord(email: string): Observable<boolean> {
    const forgotInput: ForgotPasswordInput = { email };
    return this.accountServiceProxy.accountForgotPasswordPost(forgotInput);
  }

  public doesForgotPasswordInfoExists(hash: string): Observable<boolean> {
    return this.accountServiceProxy.accountDoesForgotPasswordInfoExistsGet(hash);
  }

  public requestUpdateForgottenPassword(hash: string, password: string) {
    const forgotInput: ForgotPasswordInput = { hash, password };
    return this.accountServiceProxy.accountUpdatePasswordPost(forgotInput);
  }
}
