import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { oAuthConfig } from '../consts/oauth.settings';

@Injectable({
  providedIn: 'root',
})
export class OauthManagerService {
  private loginFailed: boolean;
  public internalUserInfo: UserInfo;

  public finishedLoadingSubject = new BehaviorSubject<boolean>(false);
  public finishedLoading = false;
  public get isLogged() { return !this.loginFailed && this.oauthService.hasValidAccessToken(); }
  public get userInfo() { return this.internalUserInfo; }
  public get authEvents() { return this.oauthService.events; }
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get accessTokenExpiration() { return this.oauthService.getAccessTokenExpiration(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get idTokenExpiration() { return this.oauthService.getIdTokenExpiration(); }

  constructor(private oauthService: OAuthService) { }

  public async init(): Promise<boolean> {
    this.oauthService.configure(oAuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    try {
      const success = await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.finishedLoadingSubject.next(success);
      this.oauthService.setupAutomaticSilentRefresh();
      this.finishedLoading = success;
      return success;
    }
    catch (e) {
      this.loginFailed = true;
      return Promise.resolve(false);
    }
  }

  public initAndForceLogin(): void {
    this.init().then(res => {
      if (!res) {
        this.login();
      }
    });
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public getUserInfo(forceReload = false): Promise<UserInfo> {
    if (!forceReload && this.userInfo) {
      return new Promise((resolve) => {
        resolve(this.userInfo);
      });
    }
    return this.oauthService.loadUserProfile().then(result => {
      this.internalUserInfo = result;
      return result;
    });
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
