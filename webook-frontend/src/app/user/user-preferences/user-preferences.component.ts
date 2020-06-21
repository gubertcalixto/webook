import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserPreferencesService } from './user-preferences.service';

const preferencesTabs = [
  {
    title: 'Configurações de Conta',
    icon: 'user'
  },
  {
    title: 'Configurações do Editor',
    icon: 'edit'
  },
  {
    title: 'Danger Zone',
    icon: 'biohazard',
    iconColor: 'red'
  }
];

@Component({
  selector: 'wb-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnDestroy {
  private subs: Subscription[] = [];
  public tabs = preferencesTabs;
  public tabIndex = 0;
  public isSaving = false;

  constructor(public userPreferencesService: UserPreferencesService) {
    this.subs.push(this.userPreferencesService.emitSaved.subscribe(() => {
      this.isSaving = false;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public emitSave(): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    this.userPreferencesService.emitSave.next();
  }
}
