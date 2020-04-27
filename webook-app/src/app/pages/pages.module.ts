import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { FaIconsModule } from '@shared/fa-icons/fa-icons.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {ExampleNotebookModule} from './example-notebook/example-notebook.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    FormsModule,




    ExampleNotebookModule,



    NzLayoutModule,
    NzInputModule,
    NzButtonModule,
    NzMenuModule,
    FaIconsModule,

    PagesRoutingModule
  ],
})
export class PagesModule { }
