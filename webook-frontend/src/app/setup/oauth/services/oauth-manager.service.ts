import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { oAuthConfig } from '../consts/oauth.settings';

@Injectable({
  providedIn: 'root'
})
export class OauthManagerService {
  private loginFailed: boolean;
  public internalUserInfo: UserInfo;

  public finishedLoadingSubject = new BehaviorSubject<boolean>(false);
  public hasLoginProccessInited = false;
  public finishedLoading = false;
  public get isLogged() { return !this.loginFailed && this.oauthService.hasValidAccessToken(); }
  public get userInfo() { return this.internalUserInfo; }
  public get authEvents() { return this.oauthService.events; }
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get accessTokenExpiration() { return this.oauthService.getAccessTokenExpiration(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get idTokenExpiration() { return this.oauthService.getIdTokenExpiration(); }

  constructor(private oauthService: OAuthService) { }

  public async init(forceLogin = true): Promise<boolean> {
    this.hasLoginProccessInited = true;
    this.oauthService.configure(oAuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    try {
      const success = forceLogin ?
        await this.oauthService.loadDiscoveryDocumentAndLogin() :
        await this.oauthService.loadDiscoveryDocumentAndTryLogin();
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

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public async getUserInfo(forceReload = false): Promise<UserInfo> {
    if (!forceReload && this.userInfo) {
      return new Promise((resolve) => {
        resolve(this.userInfo);
      });
    }
    const result = await this.oauthService.loadUserProfile();
    this.internalUserInfo = result;
    return result;
  }

  public logOut(): void {
    this.oauthService.logOut();
  }

  public hasValidToken(): Observable<boolean> | boolean {
    if (this.finishedLoading) {
      return this.isLogged;
    }
    if (!this.hasLoginProccessInited) {
      return this.hasLoginProccessInited;
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
