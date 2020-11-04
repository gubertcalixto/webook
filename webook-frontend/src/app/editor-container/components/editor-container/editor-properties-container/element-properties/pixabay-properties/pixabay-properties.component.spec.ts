import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixabayPropertiesComponent } from './pixabay-properties.component';

describe('CheckboxPropertiesComponent', () => {
  let component: PixabayPropertiesComponent;
  let fixture: ComponentFixture<PixabayPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PixabayPropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixabayPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
