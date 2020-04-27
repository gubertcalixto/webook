import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownEditorElementComponent } from './countdown-editor-element.component';

describe('CountdownEditorElementComponent', () => {
  let component: CountdownEditorElementComponent;
  let fixture: ComponentFixture<CountdownEditorElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownEditorElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownEditorElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
