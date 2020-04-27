import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'giphy', loadChildren: () => import('./example-giphy/example-giphy.module').then(m => m.ExampleGiphyModule) },
      { path: 'pexels', loadChildren: () => import('./example-pexels/example-pexels.module').then(m => m.ExamplePexelsModule) },
      { path: 'pixabay', loadChildren: () => import('./example-pixabay/example-pixabay.module').then(m => m.ExamplePixabayModule) },
      { path: '**', redirectTo: 'giphy' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
