import { Injectable } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimplifiedUser, UserServiceProxy } from 'src/app/client/authentication';

import { OAuthUser } from '../tokens/oauth-user';
import { OauthManagerService } from './oauth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private internalUser: OAuthUser;
  private internalUserSubject = new BehaviorSubject<OAuthUser>(undefined);

  public get userSubject() { return this.internalUserSubject; }
  public get user() { return this.internalUser; }
  public get userId() { return this.internalUser?.userId; }

  constructor(
    private authManagerService: OauthManagerService,
    private userServiceProxy: UserServiceProxy,
  ) {
    this.getUserInfoAfterLogin();
  }

  public getUserInitials(firstName?: string, lastName?: string) {
    return (firstName || this.user?.firstName)?.substr(0, 1)?.toUpperCase() +
      (lastName || this.user?.lastName)?.substr(0, 1)?.toUpperCase();
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
        userName: userInfo.name || userInfo.userName,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name
      });
    } else {
      this.internalUser = undefined;
    }
    this.internalUserSubject.next(this.internalUser);
  }

  public getUserById(userId: string): Observable<SimplifiedUser> {
    return this.userServiceProxy.userIdGet(userId);
  }
}
