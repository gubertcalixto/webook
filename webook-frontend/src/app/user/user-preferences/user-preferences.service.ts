import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserPreferencesService {
  public emitSave = new Subject<void>();
  public emitSaved = new Subject<void>();
}
