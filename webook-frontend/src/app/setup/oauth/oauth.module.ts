import { CommonModule } from '@angular/common';
import { isDevMode, NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

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
    if (!isDevMode() || environment.tryLoginAtStart) {
      authManagerService.init(false);
    }
  }
}
