import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccEditorElementProjectionComponent } from './tcc-editor-element-projection.component';

describe('TccEditorElementProjectionComponent', () => {
  let component: TccEditorElementProjectionComponent;
  let fixture: ComponentFixture<TccEditorElementProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccEditorElementProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccEditorElementProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
