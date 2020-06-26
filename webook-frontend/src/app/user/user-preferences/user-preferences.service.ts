import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceOutput, UserPreferencesServiceProxy } from 'src/app/client/webook';

@Injectable()
export class UserPreferencesService {
  constructor(private userPreferencesServiceProxy: UserPreferencesServiceProxy) { }

  public getUserPreferences(): Observable<UserPreferenceOutput> {
    return this.userPreferencesServiceProxy.userPreferencesGet();
  }

  public createUserPreferences(invisibleMode?: boolean, newsletterActivated?: boolean, autoplayAudios?: boolean, autoplayVideos?: boolean): Observable<UserPreferenceOutput> {
    const input: UserPreferenceOutput = {
      autoplayAudios,
      autoplayVideos,
      invisibleMode,
      newsletterActivated
    };
    return this.userPreferencesServiceProxy.userPreferencesPost(input);
  }

  public updateUserPreferences(invisibleMode?: boolean, newsletterActivated?: boolean, autoplayAudios?: boolean, autoplayVideos?: boolean): Observable<UserPreferenceOutput> {
    const input: UserPreferenceOutput = {
      autoplayAudios,
      autoplayVideos,
      invisibleMode,
      newsletterActivated
    };
    return this.userPreferencesServiceProxy.userPreferencesPut(input);
  }
}
