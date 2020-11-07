import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElipsePropertiesComponent } from './elipse-properties.component';

describe('ElipsePropertiesComponent', () => {
  let component: ElipsePropertiesComponent;
  let fixture: ComponentFixture<ElipsePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElipsePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElipsePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
