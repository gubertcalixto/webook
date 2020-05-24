import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNotebookPageComponent } from './example-notebook-page.component';

describe('ExampleNotebookPageComponent', () => {
  let component: ExampleNotebookPageComponent;
  let fixture: ComponentFixture<ExampleNotebookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNotebookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNotebookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
