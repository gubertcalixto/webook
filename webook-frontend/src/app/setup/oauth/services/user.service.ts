import { Injectable } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

import { OAuthUser } from '../tokens/oauth-user';
import { OauthManagerService } from './oauth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private internalUser: OAuthUser;
  private internalUserSubject = new BehaviorSubject<OAuthUser>(undefined);

  public get user() { return this.internalUser; }
  public get userSubject() { return this.internalUserSubject; }

  constructor(private authManagerService: OauthManagerService) {
    this.getUserInfoAfterLogin();
  }

  private getUserInfoAfterLogin(): void {
    this.authManagerService.finishedLoadingSubject.subscribe(res => {
      if (!res) {
        return;
      }
      this.authManagerService.getUserInfo().then(userInfo => {
        this.updateUser(userInfo);
      });
    });
  }

  private updateUser(userInfo: UserInfo): void {
    if (userInfo) {
      this.internalUser = new OAuthUser({
        userId: userInfo.sub,
        email: userInfo.email,
        userName: userInfo.userName,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name
      });
    } else {
      this.internalUser = undefined;
    }
    this.internalUserSubject.next(this.internalUser);
  }
}
