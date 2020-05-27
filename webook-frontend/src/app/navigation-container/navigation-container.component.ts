import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'wb-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationContainerComponent {
  public isCollapsed = false;
  public hasNotification = true;
  public routeHasNavigation = false;

  constructor(private router: Router) {
    this.startNavigationResolver();
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
      this.hasNotification = false;
    }
  }

  public logout(): void {
    // TODO logout process
  }
}
