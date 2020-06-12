import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { UrlConsts } from 'src/environments/url-consts';

import { ApiModule, BASE_PATH } from '../client/webook';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HomePageService } from './home-page.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ApiModule,

    FaIconsModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,

    HomePageRoutingModule
  ],
  providers: [
    HomePageService,
    {
      provide: BASE_PATH,
      useValue: UrlConsts.webookBackend
    }
  ]
})
export class HomePageModule { }
