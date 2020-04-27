import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamplePexelsComponent } from './example-pexels.component';

const routes: Routes = [
  { path: '', component: ExamplePexelsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplePexelsRoutingModule { }
