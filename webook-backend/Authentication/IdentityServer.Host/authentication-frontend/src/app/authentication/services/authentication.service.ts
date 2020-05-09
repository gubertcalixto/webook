import { Injectable } from '@angular/core';

import { AccountServiceProxy, IdentityLoginInput, RegisterInput } from '../client';

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
}
