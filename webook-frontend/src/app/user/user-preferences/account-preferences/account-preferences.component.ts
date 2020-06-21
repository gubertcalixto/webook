import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserPreferencesService } from '../user-preferences.service';

@Component({
  selector: 'wb-account-preferences',
  templateUrl: './account-preferences.component.html',
  styleUrls: ['./account-preferences.component.scss']
})
export class AccountPreferencesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public invisibleMode = false;
  public allowNewsletter = false;

  constructor(private userPreferencesService: UserPreferencesService) {
    this.subs.push(this.userPreferencesService.emitSave.subscribe(res => {
      this.save();
    }));
  }

  ngOnInit(): void {
    // TODO: Get Account Preferences
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private save(): void {
    // TODO: Save Account Preferences
    this.userPreferencesService.emitSaved.next();
  }
}
