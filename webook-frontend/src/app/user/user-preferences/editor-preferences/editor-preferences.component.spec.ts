import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPreferencesComponent } from './editor-preferences.component';

describe('EditorPreferencesComponent', () => {
  let component: EditorPreferencesComponent;
  let fixture: ComponentFixture<EditorPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
