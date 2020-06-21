import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { AccountPreferencesComponent } from './account-preferences/account-preferences.component';
import { DangerZonePreferencesComponent } from './danger-zone-preferences/danger-zone-preferences.component';
import { EditorPreferencesComponent } from './editor-preferences/editor-preferences.component';
import { UserPreferencesRoutingModule } from './user-preferences-routing.module';
import { UserPreferencesComponent } from './user-preferences.component';
import { UserPreferencesService } from './user-preferences.service';

@NgModule({
  declarations: [UserPreferencesComponent, DangerZonePreferencesComponent, EditorPreferencesComponent, AccountPreferencesComponent],
  imports: [
    CommonModule,
    FormsModule,
    FaIconsModule,

    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzModalModule,
    NzTabsModule,
    NzToolTipModule,

    UserPreferencesRoutingModule
  ],
  providers: [
    UserPreferencesService
  ]
})
export class UserPreferencesModule { }
