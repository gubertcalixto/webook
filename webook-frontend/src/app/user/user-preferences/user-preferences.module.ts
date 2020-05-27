import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserPreferencesRoutingModule } from './user-preferences-routing.module';
import { UserPreferencesComponent } from './user-preferences.component';

@NgModule({
  declarations: [UserPreferencesComponent],
  imports: [
    CommonModule,
    UserPreferencesRoutingModule
  ]
})
export class UserPreferencesModule { }
