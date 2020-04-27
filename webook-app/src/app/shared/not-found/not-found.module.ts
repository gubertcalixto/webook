import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzGridModule} from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,

    NotFoundRoutingModule,
    NzTypographyModule,
    NzGridModule,
    NzButtonModule
  ]
})
export class NotFoundModule { }
