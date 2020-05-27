import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentComponent } from './editor-document.component';

describe('EditorDocumentComponent', () => {
  let component: EditorDocumentComponent;
  let fixture: ComponentFixture<EditorDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
