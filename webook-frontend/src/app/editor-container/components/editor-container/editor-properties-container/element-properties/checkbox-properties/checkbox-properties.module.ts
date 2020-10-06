import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { CheckboxPropertiesComponent } from './checkbox-properties.component';

@NgModule({
  declarations: [CheckboxPropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzToolTipModule,
    NzTypographyModule
  ],
  exports: [CheckboxPropertiesComponent],
})
export class CheckboxPropertiesModule { }
