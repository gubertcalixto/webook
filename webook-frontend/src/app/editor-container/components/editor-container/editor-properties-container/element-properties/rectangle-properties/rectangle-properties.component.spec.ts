import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectanglePropertiesComponent } from './rectangle-properties.component';

describe('RectanglePropertiesComponent', () => {
  let component: RectanglePropertiesComponent;
  let fixture: ComponentFixture<RectanglePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectanglePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectanglePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
