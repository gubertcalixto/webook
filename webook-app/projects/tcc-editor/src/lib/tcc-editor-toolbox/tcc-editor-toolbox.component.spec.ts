import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccEditorToolboxComponent } from './tcc-editor-toolbox.component';

describe('TccEditorToolboxComponent', () => {
  let component: TccEditorToolboxComponent;
  let fixture: ComponentFixture<TccEditorToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccEditorToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccEditorToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
