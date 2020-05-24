import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  search = new BehaviorSubject<string>(undefined);
  hasSearch = new BehaviorSubject<boolean>(true);

  constructor() { }
}
