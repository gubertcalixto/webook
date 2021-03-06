import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OauthManagerService } from '@oath/services/oauth-manager.service';
import { UserService } from '@oath/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';

import { Notification } from '../client/webook';
import { NavigationService } from '../navigation/navigation.service';
import { ProfileService } from '../services/profile.service';
import { getDecodedImage } from '../utils/base64-image-converter.const';

@Component({
  selector: 'wb-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationContainerComponent implements OnDestroy {
  private subs: Subscription[] = [];
  private notificationInterval: any;
  public isCollapsed = false;
  public hasNotification = false;
  public notificationsReaded: Notification[] = [];
  public notificationsNotReaded: Notification[] = [];
  public routeHasNavigation = false;
  public userImage: string;
  public isLoadingUserImage: boolean;

  constructor(
    public oAuthManagerService: OauthManagerService,
    public userService: UserService,
    public profileService: ProfileService,
    public navigationService: NavigationService,
    public router: Router
  ) {
    this.startNavigationResolver();
    this.subs.push(oAuthManagerService.finishedLoadingSubject
      .pipe(switchMap(() => oAuthManagerService.hasValidToken()))
      .subscribe((res) => {
        if (res) {
          userService.userSubject.pipe(filter(u => Boolean(u)), first()).subscribe(() => {
            this.getUserImage();
            this.startGettingNotifications();
          });
        } else {
          this.isLoadingUserImage = false;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }

  private getUserImage(): void {
    this.isLoadingUserImage = true;
    this.userService.getUserImage().pipe(first()).subscribe((image) => {
      this.userImage = getDecodedImage(image);
      this.isLoadingUserImage = false;
    });
  }

  private startGettingNotifications(): void {
    this.getUserNotification().subscribe(() => {
      this.notificationInterval = setInterval(() => {
        this.getUserNotification().subscribe();
      }, 30000)
    });
  }

  private getUserNotification(): Observable<Notification[]> {
    return this.profileService
      .getNotifications()
      .pipe(
        first(),
        tap(result => {
          if (result) {
            this.notificationsReaded = result.filter(n => n.wasRead);
            this.notificationsNotReaded = result.filter(n => !n.wasRead);
          }
          const hasNotReaded = Boolean(this.notificationsNotReaded.length);
          this.hasNotification = hasNotReaded;
        })
      );
  }

  public startNavigationResolver(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.doesRouteHasNavigation(this.router.routerState, this.router.routerState.root);
      });
  }

  private doesRouteHasNavigation(state: any, parent: any) {
    if (parent && parent.snapshot.data && typeof parent.snapshot.data.hasNavigation !== 'undefined') {
      this.routeHasNavigation = parent.snapshot.data.hasNavigation;
    } else if (state && parent) {
      this.doesRouteHasNavigation(state, state.firstChild(parent));
    } else {
      this.routeHasNavigation = false;
    }
  }

  public toogleSidenavCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public notificationClicked(): void {
    if (this.hasNotification) {
      this.profileService.markNotificationsAsRead().pipe(first()).subscribe();
      this.hasNotification = false;
    }
  }

  public login(): void {
    this.oAuthManagerService.login();
  }

  public logout(): void {
    this.oAuthManagerService.logOut();
  }
}
