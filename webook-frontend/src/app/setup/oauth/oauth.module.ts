import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

import { MustBeLoggedAuthGuard } from './consts/guards/must-be-logged.guard';
import { MustBeUnLoggedAuthGuard } from './consts/guards/must-be-unlogged.guard';
import { OauthManagerService } from './services/oauth-manager.service';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OAuthModule.forRoot()
  ],
  providers: [
    MustBeLoggedAuthGuard,
    MustBeUnLoggedAuthGuard,
    { provide: OAuthStorage, useFactory: storageFactory }
  ]
})
export class AppOAuthModule {
  constructor(authManagerService: OauthManagerService) {
    const forceLogin = location.hash === '#forceLogin=true';
    if (forceLogin) {
      location.hash = '';
    }
    if (environment.tryLoginAtStart) {
      authManagerService.init(forceLogin);
    }
  }
}
