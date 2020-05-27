import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocumentViewerRoutingModule } from './document-viewer-routing.module';
import { DocumentViewerComponent } from './document-viewer.component';

@NgModule({
  declarations: [DocumentViewerComponent],
  imports: [
    CommonModule,
    DocumentViewerRoutingModule
  ]
})
export class DocumentViewerModule { }
