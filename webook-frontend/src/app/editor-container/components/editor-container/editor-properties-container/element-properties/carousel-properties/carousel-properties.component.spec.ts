import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPropertiesComponent } from './carousel-properties.component';

describe('CarouselPropertiesComponent', () => {
  let component: CarouselPropertiesComponent;
  let fixture: ComponentFixture<CarouselPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselPropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
