import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCheckboxElementComponent } from './editor-checkbox-element.component';

describe('EditorCheckboxElementComponent', () => {
  let component: EditorCheckboxElementComponent;
  let fixture: ComponentFixture<EditorCheckboxElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCheckboxElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCheckboxElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
