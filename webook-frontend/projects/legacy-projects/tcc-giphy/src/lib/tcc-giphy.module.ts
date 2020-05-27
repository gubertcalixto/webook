import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TccGiphyService } from './tcc-giphy.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [TccGiphyService]
})
export class TccGiphyModule { }
