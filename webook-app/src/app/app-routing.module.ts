import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleResolverService } from '@shared/title-resolver.service';

const routes: Routes = [
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'not-found', loadChildren: () => import('./shared/not-found/not-found.module').then(m => m.NotFoundModule) },
  {
    path: 'editor', loadChildren: () => import('./pages/example-editor/example-editor.module').then(m => m.ExampleEditorModule),
    data: { title: 'Editor' }
  },
  { path: '', pathMatch: 'full', redirectTo: 'editor' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(titleResolverService: TitleResolverService) {
    titleResolverService.startTitleResolver();
  }
}
