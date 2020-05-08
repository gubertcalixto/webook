import { Injectable } from '@angular/core';

import { AccountServiceProxy, IdentityLoginInput } from '../client';

@Injectable()
export class AuthenticationService {
  constructor(private accountServiceProxy: AccountServiceProxy) { }

  public signIn(login: string, password: string, returnUrl: string = null) {
    const user: IdentityLoginInput = { login, password, returnUrl };
    return this.accountServiceProxy.accountLoginPost(user);
  }
}
