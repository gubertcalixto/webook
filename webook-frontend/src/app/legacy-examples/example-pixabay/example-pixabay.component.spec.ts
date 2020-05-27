import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePixabayComponent } from './example-pixabay.component';

describe('ExamplePixabayComponent', () => {
  let component: ExamplePixabayComponent;
  let fixture: ComponentFixture<ExamplePixabayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePixabayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePixabayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
