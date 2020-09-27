import { Injectable } from '@angular/core';
import { ExternalServiceProxy } from '../client/api/externalServiceProxy';

@Injectable()
export class ExternalAuthenticationService {

  constructor(private externalServiceProxy:ExternalServiceProxy) {}

  public loginWithGoogle(): any{
    this.externalServiceProxy.externalChallengeGet().subscribe();
  }
}
