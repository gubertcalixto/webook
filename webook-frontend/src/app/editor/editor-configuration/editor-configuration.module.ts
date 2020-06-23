import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { EditorConfigurationModalComponent } from './editor-configuration-modal/editor-configuration-modal.component';

@NgModule({
  declarations: [EditorConfigurationModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzFormModule,
    NzSwitchModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzPopoverModule,
    NzTypographyModule,
  ],
  providers: [
  ],
  exports: [
    EditorConfigurationModalComponent
  ]
})
export class EditorConfigurationModule { }
