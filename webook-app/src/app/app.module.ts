import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleResolverService } from '@shared/title-resolver.service';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppOAuthModule } from './oauth/oauth.module';

registerLocaleData(pt);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeyboardShortcutsModule.forRoot(),
    AppOAuthModule,
    AppRoutingModule
  ],
  providers: [
    TitleResolverService,
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
