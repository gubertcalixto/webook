import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyPropertiesComponent } from './giphy-properties.component';

describe('CheckboxPropertiesComponent', () => {
  let component: GiphyPropertiesComponent;
  let fixture: ComponentFixture<GiphyPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiphyPropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
