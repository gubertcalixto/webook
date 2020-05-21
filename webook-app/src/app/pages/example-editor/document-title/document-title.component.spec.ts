import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTitleComponent } from './document-title.component';

describe('DocumentTitleComponent', () => {
  let component: DocumentTitleComponent;
  let fixture: ComponentFixture<DocumentTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
