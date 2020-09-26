import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconsModule } from '@shared/components';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NavigationContainerComponent } from './navigation-container.component';

@NgModule({
  declarations: [NavigationContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FaIconsModule,
    FormsModule,

    NzAvatarModule,
    NzBadgeModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzSkeletonModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzPopoverModule,
    NzToolTipModule
  ],
  exports: [NavigationContainerComponent],
})
export class NavigationContainerModule { }
