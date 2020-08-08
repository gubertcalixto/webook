import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorConfigurationModalComponent } from './editor-configuration-modal.component';

describe('EditorConfigurationModalComponent', () => {
  let component: EditorConfigurationModalComponent;
  let fixture: ComponentFixture<EditorConfigurationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorConfigurationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorConfigurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
