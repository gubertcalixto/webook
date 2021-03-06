import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { filter, map } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, titleService: Title) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const title = this.getTitle(router.routerState, router.routerState.root);
          return title ? `${title.trim()} | Webook` : 'Webook';
        }))
      .subscribe((title: string) => titleService.setTitle(title));
  }

  private getTitle(state: any, parent: any): string {
    let title: string;
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      title = parent.snapshot.data.title;
    } else if (state && parent) {
      title = this.getTitle(state, state.firstChild(parent));
    }
    return title;
  }
}
