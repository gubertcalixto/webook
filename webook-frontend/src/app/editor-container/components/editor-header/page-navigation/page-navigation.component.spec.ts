import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentPageNavigationComponent } from './page-navigation.component';

describe('PageNavigationComponent', () => {
  let component: EditorDocumentPageNavigationComponent;
  let fixture: ComponentFixture<EditorDocumentPageNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorDocumentPageNavigationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocumentPageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
