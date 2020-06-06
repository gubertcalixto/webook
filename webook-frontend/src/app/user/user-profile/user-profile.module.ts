import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

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
    NzStatisticModule,

    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
