import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TCC_PIXABAY_API_KEY } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { YoutubePropertiesComponent } from './youtube-properties.component';

@NgModule({
  declarations: [YoutubePropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzInputNumberModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzTimePickerModule,
    NzToolTipModule,
    NzTypographyModule,
    NzEmptyModule,
  ],
  providers: [
    { provide: TCC_PIXABAY_API_KEY, useValue: authKeys.pixabay.authKey },
  ],
  exports: [YoutubePropertiesComponent],
})
export class YoutubePropertiesModule { }
