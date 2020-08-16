import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorPageService {
  public documentChangedSubject = new Subject<void>();
}
