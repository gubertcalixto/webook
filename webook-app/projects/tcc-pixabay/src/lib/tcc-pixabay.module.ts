import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TccPixabayService } from './tcc-pixabay.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [TccPixabayService]
})
export class TccPixabayModule { }
