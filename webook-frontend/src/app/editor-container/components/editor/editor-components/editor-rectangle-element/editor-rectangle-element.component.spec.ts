import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRectangleElementComponent } from './editor-rectangle-element.component';

describe('EditorRectangleElementComponent', () => {
  let component: EditorRectangleElementComponent;
  let fixture: ComponentFixture<EditorRectangleElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorRectangleElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRectangleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
