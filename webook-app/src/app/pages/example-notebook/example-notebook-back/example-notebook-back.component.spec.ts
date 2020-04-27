import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNotebookBackComponent } from './example-notebook-back.component';

describe('ExampleNotebookBackComponent', () => {
  let component: ExampleNotebookBackComponent;
  let fixture: ComponentFixture<ExampleNotebookBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNotebookBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNotebookBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
