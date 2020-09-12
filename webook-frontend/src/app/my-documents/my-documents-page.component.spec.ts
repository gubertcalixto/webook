import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocumentsPageComponent } from './my-documents-page.component';

describe('MyDocumentsPageComponent', () => {
  let component: MyDocumentsPageComponent;
  let fixture: ComponentFixture<MyDocumentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDocumentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
