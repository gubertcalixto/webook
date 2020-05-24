import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TccPexelsService } from './tcc-pexels.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [TccPexelsService]
})
export class TccPexelsModule { }
