import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthHttpInterceptor } from '@oath/tokens/oauth-http-interceptor.token';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationContainerModule } from './navigation-container/navigation-container.module';
import { AppOAuthModule } from './setup/oauth/oauth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppOAuthModule,
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
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
