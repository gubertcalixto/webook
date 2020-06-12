import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public search = new BehaviorSubject<string>(undefined);
  public hasSearch = new BehaviorSubject<boolean>(true);
  public navigationActionsTemplate = new BehaviorSubject<TemplateRef<any>>(undefined);

  public setNavigationActionsTemplate(template: TemplateRef<any>) {
    setTimeout(() => this.navigationActionsTemplate.next(template));
  }

  public clearNavigationActionsTemplate() {
    this.setNavigationActionsTemplate(undefined);
  }
}
