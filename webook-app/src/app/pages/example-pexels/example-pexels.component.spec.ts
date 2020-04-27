import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePexelsComponent } from './example-pexels.component';

describe('ExamplePexelsComponent', () => {
  let component: ExamplePexelsComponent;
  let fixture: ComponentFixture<ExamplePexelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePexelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePexelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
