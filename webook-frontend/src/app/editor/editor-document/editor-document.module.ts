import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { WebookEditorModule } from '@wb-editor/webook-editor.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { DocumentService } from 'src/app/services/document.service';

import { EditorDocumentTitleComponent } from './document-title/document-title.component';
import { EditorDocumentRoutingModule } from './editor-document-routing.module';
import { EditorDocumentComponent } from './editor-document.component';
import {
  EditorDocumentPageExpandedNavigationComponent,
} from './page-expanded-navigation/page-expanded-navigation.component';
import { EditorDocumentPageNavigationComponent } from './page-navigation/page-navigation.component';

@NgModule({
  declarations: [
    EditorDocumentComponent,
    EditorDocumentPageNavigationComponent,
    EditorDocumentPageExpandedNavigationComponent,
    EditorDocumentTitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzButtonModule,
    NzSpaceModule,
    NzInputModule,
    WebookEditorModule,
    FaIconsModule,
    EditorDocumentRoutingModule
  ],
  providers: [
    DocumentService
  ]
})
export class EditorDocumentModule { }
