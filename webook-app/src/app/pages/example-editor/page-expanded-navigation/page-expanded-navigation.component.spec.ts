import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageExpandedNavigationComponent } from './page-expanded-navigation.component';

describe('PageExpandedNavigationComponent', () => {
  let component: PageExpandedNavigationComponent;
  let fixture: ComponentFixture<PageExpandedNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageExpandedNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageExpandedNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
