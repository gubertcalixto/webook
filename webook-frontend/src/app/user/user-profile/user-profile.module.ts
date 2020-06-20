import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { ProfileService } from 'src/app/services/profile.service';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FaIconsModule,

    NzAvatarModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzSkeletonModule,
    NzStatisticModule,

    UserProfileRoutingModule
  ],
  providers: [
    ProfileService
  ]
})
export class UserProfileModule { }
