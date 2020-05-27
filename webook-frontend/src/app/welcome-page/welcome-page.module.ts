import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WelcomePageRoutingModule } from './welcome-page-routing.module';
import { WelcomePageComponent } from './welcome-page.component';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    WelcomePageRoutingModule
  ]
})
export class WelcomePageModule { }
