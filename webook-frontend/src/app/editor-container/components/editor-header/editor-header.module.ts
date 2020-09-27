import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DocumentService } from 'src/app/services/document.service';

import { EditorConfigurationModule } from '../editor-configuration/editor-configuration.module';
import { EditorDenounceModule } from '../editor-denounce/editor-denounce.module';
import { EditorDocumentTitleComponent } from './document-title/document-title.component';
import { EditorHeaderComponent } from './editor-header.component';
import {
  EditorDocumentPageExpandedNavigationComponent,
} from './page-expanded-navigation/page-expanded-navigation.component';
import { EditorDocumentPageNavigationComponent } from './page-navigation/page-navigation.component';

@NgModule({
  declarations: [
    EditorHeaderComponent,
    EditorDocumentPageNavigationComponent,
    EditorDocumentPageExpandedNavigationComponent,
    EditorDocumentTitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    FaIconsModule,
    EditorConfigurationModule,
    EditorDenounceModule,

    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzSpaceModule,
    NzSpinModule,
    NzToolTipModule
  ],
  providers: [
    DocumentService
  ],
  exports: [
    EditorHeaderComponent
  ]
})
export class EditorHeaderModule { }
