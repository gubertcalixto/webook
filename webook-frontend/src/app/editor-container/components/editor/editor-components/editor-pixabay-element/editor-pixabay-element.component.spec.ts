import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPixabayElementComponent } from './editor-pixabay-element.component';

describe('EditorPixabayElementComponent', () => {
  let component: EditorPixabayElementComponent;
  let fixture: ComponentFixture<EditorPixabayElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPixabayElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPixabayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
