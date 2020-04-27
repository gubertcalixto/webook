import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TCC_PEXELS_API_KEY, TccPexelsModule } from 'projects/tcc-pexels/src/public-api';
import { authKeys } from 'src/app/configs/auth_keys';

import { ExamplePexelsRoutingModule } from './example-pexels-routing.module';
import { ExamplePexelsComponent } from './example-pexels.component';

@NgModule({
  declarations: [ExamplePexelsComponent],
  imports: [
    CommonModule,
    TccPexelsModule,
    NzEmptyModule,
    NzButtonModule,
    ExamplePexelsRoutingModule
  ],
  providers: [
    { provide: TCC_PEXELS_API_KEY, useValue: authKeys.pexels.authKey }
  ],
  exports: [
    ExamplePexelsComponent
  ]
})
export class ExamplePexelsModule { }
