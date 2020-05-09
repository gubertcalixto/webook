import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { urlConsts } from 'src/environments/url.consts';

import { FaIconsModule } from '../shared/fa-icons/fa-icons.module';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationSocialMediaComponent } from './authentication-social-media/authentication-social-media.component';
import { ApiModule as LoginApiModule, BASE_PATH as LoginPath } from './client';
import { AuthenticationService } from './services/authentication.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthenticationSocialMediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginApiModule,

    SharedModule,
    FaIconsModule,

    NzGridModule,
    NzToolTipModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    AuthenticationRoutingModule
  ],
  providers: [
    {
      provide: LoginPath, useValue: urlConsts.authServerUrl()
    },
    AuthenticationService
  ]
})
export class AuthenticationModule { }
