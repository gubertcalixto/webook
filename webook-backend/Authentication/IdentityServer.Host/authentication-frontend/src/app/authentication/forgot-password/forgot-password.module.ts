import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FaIconsModule } from 'src/app/shared/fa-icons/fa-icons.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    FaIconsModule,

    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzToolTipModule,
    NzTypographyModule,

    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
