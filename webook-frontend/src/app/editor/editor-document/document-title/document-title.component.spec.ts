import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentTitleComponent } from './document-title.component';

describe('DocumentTitleComponent', () => {
  let component: EditorDocumentTitleComponent;
  let fixture: ComponentFixture<EditorDocumentTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorDocumentTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocumentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
