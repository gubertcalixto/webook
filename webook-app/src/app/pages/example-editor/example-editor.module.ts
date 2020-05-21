import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/fa-icons/fa-icons.module';
import { TccEditorModule } from '@tcc-editor/tcc-editor.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { DocumentTitleComponent } from './document-title/document-title.component';
import { ExampleEditorRoutingModule } from './example-editor-routing.module';
import { ExampleEditorComponent } from './example-editor.component';
import { PageNavigationComponent } from './page-navigation/page-navigation.component';

@NgModule({
  declarations: [ExampleEditorComponent, DocumentTitleComponent, PageNavigationComponent],
  imports: [
    CommonModule,
    TccEditorModule,
    FormsModule,
    NzGridModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzInputModule,
    FaIconsModule,
    ExampleEditorRoutingModule
  ]
})
export class ExampleEditorModule { }
