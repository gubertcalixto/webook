import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserPreferencesService } from '../user-preferences.service';

@Component({
  selector: 'wb-editor-preferences',
  templateUrl: './editor-preferences.component.html',
  styleUrls: ['./editor-preferences.component.scss']
})
export class EditorPreferencesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public startAudiosAutomatically: boolean;
  public startVideosAutomatically: boolean;

  constructor(private userPreferencesService: UserPreferencesService) {
    this.subs.push(this.userPreferencesService.emitSave.subscribe(res => {
      this.save();
    }));
  }

  ngOnInit(): void {
    // TODO: Get Editor Preferences
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private save(): void {
    // TODO: Save Editor Preferences
    this.userPreferencesService.emitSaved.next();
  }
}
