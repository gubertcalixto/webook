import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyLogoComponent} from './my-logo/my-logo.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MyLogoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MyLogoComponent]
})
export class SharedModule { }
