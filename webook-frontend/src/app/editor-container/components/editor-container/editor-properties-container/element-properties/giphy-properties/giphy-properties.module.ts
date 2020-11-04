import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzEmptyModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TCC_GIPHY_API_KEY } from 'projects/legacy-projects/tcc-giphy/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { GiphyPropertiesComponent } from './giphy-properties.component';

@NgModule({
  declarations: [GiphyPropertiesComponent],
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
  providers: [{ provide: TCC_GIPHY_API_KEY, useValue: authKeys.giphy.authKey }],
  exports: [GiphyPropertiesComponent],
})
export class GiphyPropertiesModule {}
