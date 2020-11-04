import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconsModule } from '@shared/components';
import { NzEmptyModule } from 'ng-zorro-antd';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ColorPickerModule } from 'ngx-color-picker';
import { TCC_GIPHY_API_KEY, TccGiphyModule } from 'projects/legacy-projects/tcc-giphy/src/public-api';
import { TCC_PIXABAY_API_KEY, TccPixabayModule } from 'projects/legacy-projects/tcc-pixabay/src/public-api';
import { authKeys } from 'src/app/setup/apis/auth-keys';

import { EditorPropertiesContainerComponent } from './editor-properties-container.component';
import { ElementPropertiesModule } from './element-properties/element-properties.module';
import { EditorPagePropertiesModule } from './page-properties/page-properties.module';

@NgModule({
  declarations: [EditorPropertiesContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    FaIconsModule,

    EditorPagePropertiesModule,
    ElementPropertiesModule,

    ColorPickerModule,
    NzUploadModule,
    NzTypographyModule,
    TccGiphyModule,
    TccPixabayModule,
    NzEmptyModule,
  ],
  providers: [
    { provide: TCC_GIPHY_API_KEY, useValue: authKeys.giphy.authKey },
    { provide: TCC_PIXABAY_API_KEY, useValue: authKeys.pixabay.authKey },
  ],
  exports: [EditorPropertiesContainerComponent],
})
export class EditorPropertiesContainerModule { }
