import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { MustBeLoggedAuthGuard } from './consts/guards/must-be-logged.guard';
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
    { provide: OAuthStorage, useFactory: storageFactory }
  ]
})
export class AppOAuthModule {
  constructor(authManagerService: OauthManagerService) {
    authManagerService.init();
  }
}
