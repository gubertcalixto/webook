import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { DocumentListModule } from '../document-list/document-list.module';
import { DocumentService } from '../services/document.service';
import { FilterSelectionComponent } from './filter-selection/filter-selection.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterSelectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentListModule,
    FaIconsModule,

    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzEmptyModule,
    NzPaginationModule,
    NzFormModule,
    NzModalModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSpinModule,
    NzRateModule,

    SearchRoutingModule,
  ],
  providers: [DocumentService]
})
export class SearchModule { }
