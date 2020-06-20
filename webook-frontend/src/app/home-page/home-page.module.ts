import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { DocumentService } from '../services/document.service';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,

    FaIconsModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSpaceModule,
    NzTypographyModule,

    HomePageRoutingModule
  ],
  providers: [
    DocumentService
  ]
})
export class HomePageModule { }
