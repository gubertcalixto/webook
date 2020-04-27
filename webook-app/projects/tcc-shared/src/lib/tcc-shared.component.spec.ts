import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccSharedComponent } from './tcc-shared.component';

describe('TccSharedComponent', () => {
  let component: TccSharedComponent;
  let fixture: ComponentFixture<TccSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
