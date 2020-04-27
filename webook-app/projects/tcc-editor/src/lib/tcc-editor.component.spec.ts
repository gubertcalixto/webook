import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccEditorComponent } from './tcc-editor.component';

describe('TccEditorComponent', () => {
  let component: TccEditorComponent;
  let fixture: ComponentFixture<TccEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
