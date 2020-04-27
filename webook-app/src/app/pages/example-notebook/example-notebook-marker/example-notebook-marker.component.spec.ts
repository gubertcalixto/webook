import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNotebookMarkerComponent } from './example-notebook-marker.component';

describe('ExampleNotebookMarkerComponent', () => {
  let component: ExampleNotebookMarkerComponent;
  let fixture: ComponentFixture<ExampleNotebookMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNotebookMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNotebookMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
