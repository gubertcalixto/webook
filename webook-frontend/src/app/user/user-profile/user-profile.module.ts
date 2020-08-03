import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
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
import { DocumentListModule } from 'src/app/document-list/document-list.module';
import { DocumentService } from 'src/app/services/document.service';
import { ProfileService } from 'src/app/services/profile.service';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FaIconsModule,
    DocumentListModule,

    NzAvatarModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzSpinModule,
    NzEmptyModule,
    NzPaginationModule,
    NzNotificationModule,


    UserProfileRoutingModule
  ],
  providers: [
    ProfileService,
    DocumentService
  ]
})
export class UserProfileModule { }
