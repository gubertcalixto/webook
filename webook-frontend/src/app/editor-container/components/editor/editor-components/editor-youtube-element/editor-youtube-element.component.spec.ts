import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorYoutubeElementComponent } from './editor-youtube-element.component';

describe('EditorYoutubeElementComponent', () => {
  let component: EditorYoutubeElementComponent;
  let fixture: ComponentFixture<EditorYoutubeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorYoutubeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorYoutubeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
