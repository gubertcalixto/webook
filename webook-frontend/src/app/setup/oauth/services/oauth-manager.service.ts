import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService, OAuthSuccessEvent, UserInfo } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
      let success: boolean;
      if (forceLogin) {
        success = await this.oauthService.loadDiscoveryDocumentAndLogin();
      } else {
        success = await this.oauthService.loadDiscoveryDocumentAndTryLogin() ||
          (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken());
      }
      this.clearHashAfterLogin();
      this.oauthService.setupAutomaticSilentRefresh();
      this.finishedLoading = true;
      this.finishedLoadingSubject.next(true);

      return success;
    }
    catch (e) {
      this.loginFailed = true;
      return Promise.resolve(false);
    }
  }

  private clearHashAfterLogin() {
    // Makes sure hash was used successfully
    this.oauthService.events.subscribe(oauthEvent => {
      if (oauthEvent instanceof OAuthErrorEvent) {
        const errorReason = (oauthEvent.reason as HttpErrorResponse);
        if (!errorReason.ok && errorReason.status !== 404) {
          localStorage.removeItem('access_token');
          window.location.reload();
        }
      } else if (oauthEvent instanceof OAuthSuccessEvent) {
        setTimeout(() => {
          if (location.hash) {
            location.hash = '';
          }
        }, 200);
      }
    });
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
    if (!(await this.hasValidToken().toPromise())) {
      return null;
    }
    const result = await this.oauthService.loadUserProfile();
    this.internalUserInfo = result;
    return result;
  }

  public logOut(): void {
    this.oauthService.logOut();
  }

  public hasValidToken(): Observable<boolean> {
    if (this.finishedLoading) {
      return of(this.isLogged);
    }
    if (!this.hasLoginProccessInited) {
      return of(this.hasLoginProccessInited);
    }
    return this.finishedLoadingSubject
      .pipe(map(() => {
        return !this.loginFailed && this.oauthService.hasValidAccessToken();
      }));
  }
}
