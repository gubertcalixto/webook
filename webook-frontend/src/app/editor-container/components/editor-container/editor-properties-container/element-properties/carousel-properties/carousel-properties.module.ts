import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TCC_PIXABAY_API_KEY } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { CarouselPropertiesComponent } from './carousel-properties.component';

@NgModule({
  declarations: [CarouselPropertiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconsModule,
    NzPopoverModule,
    NzToolTipModule,
    NzSelectModule,
    NzSwitchModule,
    NzSliderModule,
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
  exports: [CarouselPropertiesComponent],
})
export class CarouselPropertiesModule {}
