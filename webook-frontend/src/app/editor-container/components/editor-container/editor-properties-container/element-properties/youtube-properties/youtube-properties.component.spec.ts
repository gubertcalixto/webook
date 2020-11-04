import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePropertiesComponent } from './youtube-properties.component';

describe('YoutubePropertiesComponent', () => {
  let component: YoutubePropertiesComponent;
  let fixture: ComponentFixture<YoutubePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubePropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
