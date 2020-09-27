import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { DenounceDocumentServiceProxy } from '../../../client/webook/api/denounceDocumentServiceProxy';
import { DenounceService } from './denounce.service';
import { EditorDenounceModalComponent } from './editor-denounce-modal/editor-denounce-modal.component';

@NgModule({
  declarations: [EditorDenounceModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule
  ],
  providers: [
    DenounceService,
    DenounceDocumentServiceProxy
  ],
  exports: [EditorDenounceModalComponent],
})
export class EditorDenounceModule { }
