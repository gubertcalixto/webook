import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { DocumentListModule } from '../document-list/document-list.module';
import { DocumentService } from '../services/document.service';
import { HomePageRoutingModule } from './my-documents-page-routing.module';
import { MyDocumentsPageComponent } from './my-documents-page.component';

@NgModule({
  declarations: [MyDocumentsPageComponent],
  imports: [
    CommonModule,

    FaIconsModule,
    DocumentListModule,

    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzNotificationModule,
    NzSpinModule,
    NzSpaceModule,
    NzTypographyModule,

    HomePageRoutingModule
  ],
  providers: [
    DocumentService
  ]
})
export class MyDocumentsPageModule { }
