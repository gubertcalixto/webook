import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { oAuthConfig } from '../consts/oauth.settings';

@Injectable({
  providedIn: 'root',
})
export class OauthManagerService {
  private loginFailed: boolean;

  public finishedLoadingSubject = new BehaviorSubject<boolean>(false);
  public finishedLoading = false;
  public get isLogged() { return !this.loginFailed && this.oauthService.hasValidAccessToken(); }
  public get authEvents() { return this.oauthService.events; }
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get accessTokenExpiration() { return this.oauthService.getAccessTokenExpiration(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get idTokenExpiration() { return this.oauthService.getIdTokenExpiration(); }

  constructor(private oauthService: OAuthService) { }

  public startFlow(): void {
    this.oauthService.configure(oAuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(success => {
      this.finishedLoadingSubject.next(success);
      this.finishedLoading = success;
      return success;
    }).catch(() => {
      this.loginFailed = true;
      return Promise.resolve(false);
    });
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public logOut(): void {
    this.oauthService.logOut();
  }

  public hasValidToken(): Observable<boolean> | boolean {
    if (this.finishedLoading) {
      return this.isLogged;
    }
    return this.finishedLoadingSubject
      .pipe(
        filter(res => Boolean(res)),
        map(() => {
          return !this.loginFailed && this.oauthService.hasValidAccessToken();
        })
      );
  }
}
