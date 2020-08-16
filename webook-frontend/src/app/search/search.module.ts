import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { DocumentListModule } from '../document-list/document-list.module';
import { DocumentService } from '../services/document.service';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    DocumentListModule,
    FaIconsModule,

    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzEmptyModule,
    NzPaginationModule,

    SearchRoutingModule
  ],
  providers: [DocumentService]
})
export class SearchModule { }
