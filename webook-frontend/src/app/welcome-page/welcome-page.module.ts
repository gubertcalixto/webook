import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ContactFormService } from './contact-form.service';
import { WelcomePageRoutingModule } from './welcome-page-routing.module';
import { WelcomePageComponent } from './welcome-page.component';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzResultModule,
    NzSelectModule,
    NzTypographyModule,

    WelcomePageRoutingModule,
  ],
  providers: [
    ContactFormService
  ]
})
export class WelcomePageModule { }
