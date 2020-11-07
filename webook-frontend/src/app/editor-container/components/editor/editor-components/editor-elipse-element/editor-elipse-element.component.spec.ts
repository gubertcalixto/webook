import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorElipseElementComponent } from './editor-elipse-element.component';

describe('EditorElipseElementComponent', () => {
  let component: EditorElipseElementComponent;
  let fixture: ComponentFixture<EditorElipseElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorElipseElementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorElipseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
