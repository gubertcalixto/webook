import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHistoryService {
  private internalRouteHistory: string[] = ['/'];
  private internalPreviousUrl: string = '/';
  private internalCurrentUrl: string;

  public get previousUrl(): string { return this.internalPreviousUrl; }
  public get currentUrl(): string { return this.internalCurrentUrl; }
  public get routeHistory(): string[] { return [...this.internalRouteHistory]; }

  constructor(private router: Router) {
    this.internalCurrentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.internalCurrentUrl !== event.url) {
          const normalizedLastRoute = this.internalCurrentUrl === 'not-found'
            ? '/'
            : this.internalCurrentUrl;
          this.internalPreviousUrl = normalizedLastRoute;
          this.internalRouteHistory.push(this.internalPreviousUrl);
        }
        this.internalCurrentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(): string {
    return this.internalPreviousUrl;
  }

  public navigateBack(): void {
    this.router.navigateByUrl(this.getPreviousUrl());
  }
}
