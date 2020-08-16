import { Injectable } from '@angular/core';
import { UserService } from '@oath/services/user.service';
import { Observable } from 'rxjs';

import { ProfileServiceProxy } from '../client/webook/api/profileServiceProxy';

@Injectable()
export class ProfileService {

  constructor(
    private profileServiceProxy: ProfileServiceProxy,
    private userService: UserService
  ) { }

  public getMyDocumentsNumber(): Observable<number> {
    return this.getDocumentsNumber(this.userService.user.userId);
  }

  public getDocumentsNumber(userId: string): Observable<number> {
    return this.profileServiceProxy.userUserIdDocumentsNumberGet(userId);
  }

  public getMyFollowersNumber(): Observable<number> {
    return this.profileServiceProxy.myUserFollowersNumberGet();
  }

  public getFollowersNumber(userId: string): Observable<number> {
    return this.profileServiceProxy.userUserIdFollowersNumberGet(userId);
  }

  public isFollowUser(userId: string): Observable<boolean> {
    return this.profileServiceProxy.userUserIdIsFollowingGet(userId);
  }

  public followUser(userId: string): Observable<void> {
    return this.profileServiceProxy.userUserIdFollowPost(userId);
  }

  public unfollowUser(userId: string): Observable<void> {
    return this.profileServiceProxy.userUserIdUnfollowPost(userId);
  }
}
