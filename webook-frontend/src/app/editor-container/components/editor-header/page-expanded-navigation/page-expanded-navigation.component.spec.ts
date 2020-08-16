import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentPageExpandedNavigationComponent } from './page-expanded-navigation.component';

describe('PageExpandedNavigationComponent', () => {
  let component: EditorDocumentPageExpandedNavigationComponent;
  let fixture: ComponentFixture<EditorDocumentPageExpandedNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorDocumentPageExpandedNavigationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocumentPageExpandedNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
