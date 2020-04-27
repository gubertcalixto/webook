import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNotebookComponent } from './example-notebook.component';

describe('ExampleNotebookComponent', () => {
  let component: ExampleNotebookComponent;
  let fixture: ComponentFixture<ExampleNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNotebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
