import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedAuthGuard } from '@oath-guards/must-be-logged.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    data: { title: 'Home', hasNavigation: true }
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome-page/welcome-page.module').then(m => m.WelcomePageModule),
    data: { title: 'Seja Bem Vindo' }
  },
  {
    path: 'document',
    loadChildren: () => import('./editor-container/editor-container.module').then(m => m.EditorContainerModule),
    data: { title: 'Editor de Documento' }
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
    data: { title: 'Pesquisa', hasNavigation: true }
  },
  {
    path: 'user/profile',
    loadChildren: () => import('./user/user-profile/user-profile.module').then(m => m.UserProfileModule),
    data: { title: 'Perfil', hasNavigation: true }
  },
  {
    path: 'user/preferences',
    loadChildren: () => import('./user/user-preferences/user-preferences.module').then(m => m.UserPreferencesModule),
    canActivate: [MustBeLoggedAuthGuard],
    data: { title: 'Preferências de Usuário', hasNavigation: true }
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
    data: { title: 'Página não Encontrada' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
