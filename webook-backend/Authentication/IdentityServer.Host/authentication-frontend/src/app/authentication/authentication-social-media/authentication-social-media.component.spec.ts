import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationSocialMediaComponent } from './authentication-social-media.component';

describe('AuthenticationSocialMediaComponent', () => {
  let component: AuthenticationSocialMediaComponent;
  let fixture: ComponentFixture<AuthenticationSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
