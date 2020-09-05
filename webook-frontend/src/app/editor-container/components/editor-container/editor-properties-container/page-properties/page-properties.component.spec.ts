import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePropertiesComponent } from './page-properties.component';

describe('PagePropertiesComponent', () => {
  let component: PagePropertiesComponent;
  let fixture: ComponentFixture<PagePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
