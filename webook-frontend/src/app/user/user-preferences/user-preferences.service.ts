import { Injectable } from '@angular/core';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { UserService } from '@oath/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { UserPreferenceOutput, UserPreferencesServiceProxy } from 'src/app/client/webook';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private isStarted = false;
  public hasLoadedSubject = new BehaviorSubject<boolean>(false);
  private userPreferences: UserPreferenceOutput;
  constructor(
    private oauthManagerService: OauthManagerService,
    private userService: UserService,
    private userPreferencesServiceProxy: UserPreferencesServiceProxy
  ) { }

  public start(): void {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    this.userService.userSubject
      .pipe(
        filter((user) => Boolean(user)),
        filter(() => Boolean(this.oauthManagerService.isLogged))
      )
      .subscribe(() => {
        this.getUserPreferencesRequest().pipe(first()).subscribe((preferences) => {
          this.userPreferences = preferences;
          this.hasLoadedSubject.next(true);
        });
      });
  }

  private getUserPreferencesRequest(): Observable<UserPreferenceOutput> {
    return this.userPreferencesServiceProxy.userPreferencesGet();
  }

  public getUserPreferences(): UserPreferenceOutput {
    return { ...this.userPreferences };
  }

  public createUserPreferences(invisibleMode?: boolean, newsletterActivated?: boolean, autoplayAudios?: boolean, autoplayVideos?: boolean): Observable<UserPreferenceOutput> {
    const input: UserPreferenceOutput = {
      autoplayAudios,
      autoplayVideos,
      invisibleMode,
      newsletterActivated
    };
    return this.userPreferencesServiceProxy.userPreferencesPost(input)
      .pipe(tap((output) => {
        if (output) {
          this.userPreferences = output;
          this.hasLoadedSubject.next(true);
        }
      }));
  }

  public updateUserPreferences(invisibleMode?: boolean, newsletterActivated?: boolean, autoplayAudios?: boolean, autoplayVideos?: boolean): Observable<UserPreferenceOutput> {
    const input: UserPreferenceOutput = {
      autoplayAudios,
      autoplayVideos,
      invisibleMode,
      newsletterActivated
    };
    return this.userPreferencesServiceProxy.userPreferencesPut(input)
      .pipe(tap((output) => {
        if (output) {
          this.userPreferences = output;
          this.hasLoadedSubject.next(true);
        }
      }));
  }
}
