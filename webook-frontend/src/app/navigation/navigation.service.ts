import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public search = new BehaviorSubject<string>(undefined);
  public hasSearch = new BehaviorSubject<boolean>(false);
  public navigationActionsTemplate = new BehaviorSubject<TemplateRef<any>>(undefined);

  public setNavigationActionsTemplate(template: TemplateRef<any>) {
    setTimeout(() => {
      this.navigationActionsTemplate.next(template)
      if(typeof template === 'undefined'){
        this.search.next('');
      }
    });
  }

  public clearNavigationActionsTemplate() {
    this.setNavigationActionsTemplate(undefined);
  }

  public emitHasSearch(hasSearch: boolean) {
    setTimeout(() => {
      this.hasSearch.next(hasSearch);
    });
  }

  public emitSearch(query: string) {
    setTimeout(() => {
      this.search.next(query);
    });
  }
}
