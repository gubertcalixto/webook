import { Injectable } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  AccountServiceProxy,
  InfosOutput,
  SimplifiedUser,
  UserImageInput,
  UserServiceProxy,
} from 'src/app/client/authentication';

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
    private accountServiceProxy: AccountServiceProxy,
    private nzModal: NzModalService,
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

  public getUserImage(userId: string = this.userId): Observable<string> {
    return this.userServiceProxy.userIdImageGet(userId);
  }

  public getInfosUserById(userId: string): Observable<InfosOutput> {
    return this.userServiceProxy.userIdBasicInfoGet(userId);
  }

  public updateUserImage(base64Image: string): Observable<string> {
    const imageInput: UserImageInput = {
      userImage: base64Image
    };
    return this.userServiceProxy.userImagePut(imageInput);
  }

  public deleteUser(customFn: () => Observable<any>): Promise<boolean> {
    return new Promise((res, rej) => {
      this.nzModal.confirm({
        nzTitle: 'Você tem certeza que deseja apagar sua conta?',
        nzContent: 'Sua conta será apagada, bem como todos seus documentos. Contudo as suas ações dentro do site ainda serão mantidas.',
        nzOkText: 'Sim, tenho certeza',
        nzOkType: 'danger',
        nzCancelText: 'Cancelar',
        nzOnOk: () => {
          this.accountServiceProxy.accountDeleteAccountDelete()
          .pipe(first())
          .subscribe(isDeleted => {
            if (isDeleted) {
              customFn().pipe(first()).subscribe(() => {
                this.authManagerService.logOut();
              });
            }
            res(isDeleted);
          }, (e) => rej(e))
        },
      });
    });
  }
}
