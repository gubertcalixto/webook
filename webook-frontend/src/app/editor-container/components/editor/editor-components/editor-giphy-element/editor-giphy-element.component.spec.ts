import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGiphyElementComponent } from './editor-giphy-element.component';

describe('EditorGiphyElementComponent', () => {
  let component: EditorGiphyElementComponent;
  let fixture: ComponentFixture<EditorGiphyElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorGiphyElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGiphyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
