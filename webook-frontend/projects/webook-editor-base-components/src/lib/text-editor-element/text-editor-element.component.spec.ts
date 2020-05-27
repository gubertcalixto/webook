import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorElementComponent } from './text-editor-element.component';

describe('TextEditorElementComponent', () => {
  let component: TextEditorElementComponent;
  let fixture: ComponentFixture<TextEditorElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditorElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
