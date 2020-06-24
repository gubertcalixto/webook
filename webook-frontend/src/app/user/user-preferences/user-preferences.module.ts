import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DocumentService } from 'src/app/services/document.service';

import { UserPreferencesRoutingModule } from './user-preferences-routing.module';
import { UserPreferencesComponent } from './user-preferences.component';
import { UserPreferencesService } from './user-preferences.service';

@NgModule({
  declarations: [UserPreferencesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzNotificationModule,
    NzModalModule,
    NzSpinModule,
    NzTabsModule,
    NzTypographyModule,
    NzToolTipModule,

    UserPreferencesRoutingModule
  ],
  providers: [
    DocumentService,
    UserPreferencesService
  ]
})
export class UserPreferencesModule { }
