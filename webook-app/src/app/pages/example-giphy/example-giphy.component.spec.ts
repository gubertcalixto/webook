import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGiphyComponent } from './example-giphy.component';

describe('ExampleGiphyComponent', () => {
  let component: ExampleGiphyComponent;
  let fixture: ComponentFixture<ExampleGiphyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleGiphyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleGiphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
