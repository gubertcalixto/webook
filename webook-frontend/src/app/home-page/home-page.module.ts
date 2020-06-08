import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,

    FaIconsModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,

    HomePageRoutingModule
  ]
})
export class HomePageModule { }
