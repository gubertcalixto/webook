import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

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
    { provide: OAuthStorage, useFactory: storageFactory },
    OauthManagerService
  ]
})
export class AppOAuthModule {
  constructor(authManagerService: OauthManagerService) {
    authManagerService.startFlow();

  }
}
