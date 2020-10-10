import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSliderElementComponent } from './editor-slider-element.component';

describe('EditorSliderElementComponent', () => {
  let component: EditorSliderElementComponent;
  let fixture: ComponentFixture<EditorSliderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorSliderElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSliderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
