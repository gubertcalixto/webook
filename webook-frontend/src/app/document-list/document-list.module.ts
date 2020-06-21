import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { DocumentCardComponent } from './document-card/document-card.component';

@NgModule({
  declarations: [DocumentCardComponent],
  imports: [
    CommonModule,
    FaIconsModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzTypographyModule,
  ],
  exports: [
    DocumentCardComponent
  ]
})
export class DocumentListModule { }
