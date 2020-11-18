import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconsModule } from '@shared/components';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { EditorDocumentPageService } from '../editor-container/services/document-page.service';
import { DocumentCardComponent } from './document-card/document-card.component';

@NgModule({
  declarations: [DocumentCardComponent],
  imports: [
    NzAvatarModule,
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
    NzSkeletonModule,
    NzToolTipModule,
    NzTypographyModule,
  ],
  providers: [EditorDocumentPageService],
  exports: [
    DocumentCardComponent
  ]
})
export class DocumentListModule { }
