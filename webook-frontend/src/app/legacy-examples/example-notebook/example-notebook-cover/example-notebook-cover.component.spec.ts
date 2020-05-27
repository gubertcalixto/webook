import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNotebookCoverComponent } from './example-notebook-cover.component';

describe('ExampleNotebookCoverComponent', () => {
  let component: ExampleNotebookCoverComponent;
  let fixture: ComponentFixture<ExampleNotebookCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNotebookCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNotebookCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
