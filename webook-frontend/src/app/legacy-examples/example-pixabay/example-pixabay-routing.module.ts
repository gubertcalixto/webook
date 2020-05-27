import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamplePixabayComponent } from './example-pixabay.component';

const routes: Routes = [
  { path: '', component: ExamplePixabayComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplePixabayRoutingModule { }
