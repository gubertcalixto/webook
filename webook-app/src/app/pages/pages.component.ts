import { Component } from '@angular/core';

import { navigation } from '../navigation/navigation';
import { NavigationService } from '../navigation/navigation.service';
import { OauthManagerService } from '../oauth/services/oauth-manager.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  private internalSearchInput: string;

  public get searchInput(): string {
    return this.internalSearchInput;
  }

  public set searchInput(value: string) {
    this.internalSearchInput = value;
    this.searchEmit();
  }

  public isCollapsed = false;
  public navigationGroups = navigation;

  constructor(public navigationService: NavigationService, private authManagerService: OauthManagerService) { }

  public searchEmit(): void {
    this.navigationService.search.next(this.searchInput);
  }

  public logout(): void {
    this.authManagerService.logOut();
  }
}
