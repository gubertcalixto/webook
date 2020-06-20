import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileServiceProxy } from '../client/webook/api/profileServiceProxy';

@Injectable()
export class ProfileService {

  constructor(private profileServiceProxy: ProfileServiceProxy) { }

  public getMyDocumentsNumber(): Observable<number> {
    return this.profileServiceProxy.myUserDocumentsNumberGet();
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
}
