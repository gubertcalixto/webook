import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DocumentListModule } from 'src/app/document-list/document-list.module';

import { DocumentService } from '../services/document.service';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    FaIconsModule,
    DocumentListModule,

    NzAlertModule,
    NzAvatarModule,
    NzButtonModule,
    NzEmptyModule,
    NzGridModule,
    NzLayoutModule,
    NzNotificationModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzSpinModule,
    NzTypographyModule,

    FeedRoutingModule
  ],
  providers: [
    FeedService,
    DocumentService
  ]
})
export class FeedModule { }
