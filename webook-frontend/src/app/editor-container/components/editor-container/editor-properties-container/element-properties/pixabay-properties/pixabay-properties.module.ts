import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TCC_PIXABAY_API_KEY } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { PixabayPropertiesComponent } from './pixabay-properties.component';

@NgModule({
  declarations: [PixabayPropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,

    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzToolTipModule,
    NzTypographyModule,
    NzEmptyModule,
  ],
  providers: [
    { provide: TCC_PIXABAY_API_KEY, useValue: authKeys.pixabay.authKey },
  ],
  exports: [PixabayPropertiesComponent],
})
export class PixabayPropertiesModule {}
