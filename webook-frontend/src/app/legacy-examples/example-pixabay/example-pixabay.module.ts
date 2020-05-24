import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TCC_PIXABAY_API_KEY, TccPixabayModule } from 'projects/tcc-pixabay/src/public-api';
import { authKeys } from 'src/app/configs/auth_keys';

import { ExamplePixabayRoutingModule } from './example-pixabay-routing.module';
import { ExamplePixabayComponent } from './example-pixabay.component';

@NgModule({
  declarations: [ExamplePixabayComponent],
  imports: [
    CommonModule,
    TccPixabayModule,
    NzEmptyModule,
    NzButtonModule,
    ExamplePixabayRoutingModule
  ],
  providers: [
    { provide: TCC_PIXABAY_API_KEY, useValue: authKeys.pixabay.authKey }
  ],
  exports: [
    ExamplePixabayComponent
  ]
})
export class ExamplePixabayModule { }
