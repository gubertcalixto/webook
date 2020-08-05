import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTextElementComponent } from './editor-text-element.component';

describe('EditorTextElementComponent', () => {
  let component: EditorTextElementComponent;
  let fixture: ComponentFixture<EditorTextElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTextElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTextElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
