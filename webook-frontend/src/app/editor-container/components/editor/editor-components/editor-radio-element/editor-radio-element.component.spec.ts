import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRadioElementComponent } from './editor-radio-element.component';

describe('EditorRadioComponentComponent', () => {
  let component: EditorRadioElementComponent;
  let fixture: ComponentFixture<EditorRadioElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorRadioElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRadioElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
