import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExampleGiphyComponent } from './example-giphy.component';

const routes: Routes = [
  { path: '', component: ExampleGiphyComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleGiphyRoutingModule { }
