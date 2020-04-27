import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TCC_GIPHY_API_KEY, TccGiphyModule } from 'projects/tcc-giphy/src/public-api';
import { authKeys } from 'src/app/configs/auth_keys';

import { ExampleGiphyRoutingModule } from './example-giphy-routing.module';
import { ExampleGiphyComponent } from './example-giphy.component';

@NgModule({
  declarations: [ExampleGiphyComponent],
  imports: [
    CommonModule,
    TccGiphyModule,
    NzEmptyModule,
    NzButtonModule,
    ExampleGiphyRoutingModule
  ],
  providers: [
    { provide: TCC_GIPHY_API_KEY, useValue: authKeys.giphy.authKey }
  ],
  exports: [
    ExampleGiphyComponent
  ]
})
export class ExampleGiphyModule { }
