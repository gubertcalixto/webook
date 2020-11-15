import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthHttpInterceptor } from '@oath/tokens/oauth-http-interceptor.token';
import { FaIconsModule } from '@shared/components';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UrlConsts } from 'src/environments/url-consts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule as AuthenticationClientModule, BASE_PATH as AUTH_BASE_PATH } from './client/authentication';
import { ApiModule as WebookBackendClientModule, BASE_PATH as BACK_BASE_PATH } from './client/webook';
import { NavigationContainerModule } from './navigation-container/navigation-container.module';
import { AppOAuthModule } from './setup/oauth/oauth.module';
import { UserPreferencesService } from './user/user-preferences/user-preferences.service';

registerLocaleData(pt);

const ngZorroConfig: NzConfig = {
  notification: {
    nzDuration: 2000,
    nzTop: '80px'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    WebookBackendClientModule,
    AuthenticationClientModule,
    FaIconsModule,
    HttpClientModule,
    AppOAuthModule,

    NzModalModule,

    NavigationContainerModule,

    KeyboardShortcutsModule.forRoot(),

    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthHttpInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: pt_BR },
    {
      provide: BACK_BASE_PATH,
      useValue: UrlConsts.webookBackend
    },
    {
      provide: AUTH_BASE_PATH,
      useValue: UrlConsts.authenticationBackend
    },
    {
      provide: NZ_CONFIG,
      useValue: ngZorroConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(userPreferencesService: UserPreferencesService) {
    userPreferencesService.start();
  }
}
