import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationSocialMediaComponent} from './authentication-social-media/authentication-social-media.component';
import {FaIconsModule} from '../shared/fa-icons/fa-icons.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthenticationSocialMediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
  ]
})
export class AuthenticationModule { }
