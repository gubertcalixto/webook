import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconsModule } from '@shared/components';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    KeyboardShortcutsModule.forRoot(),

    NzGridModule,
    NzBadgeModule,
    NzLayoutModule,
    NzMenuModule,
    FaIconsModule,
    NzButtonModule,

    AppOAuthModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
