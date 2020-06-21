import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerZonePreferencesComponent } from './danger-zone-preferences.component';

describe('DangerZonePreferencesComponent', () => {
  let component: DangerZonePreferencesComponent;
  let fixture: ComponentFixture<DangerZonePreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerZonePreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerZonePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
