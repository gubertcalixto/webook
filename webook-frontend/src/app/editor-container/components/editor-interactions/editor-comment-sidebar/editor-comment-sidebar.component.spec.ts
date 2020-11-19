import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCommentSidebarComponent } from './editor-comment-sidebar.component';

describe('EditorCommentSidebarComponent', () => {
  let component: EditorCommentSidebarComponent;
  let fixture: ComponentFixture<EditorCommentSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCommentSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCommentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
