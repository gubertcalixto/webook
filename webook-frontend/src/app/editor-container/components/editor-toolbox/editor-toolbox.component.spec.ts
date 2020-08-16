import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolboxComponent } from './editor-toolbox.component';

describe('EditorToolboxComponent', () => {
  let component: EditorToolboxComponent;
  let fixture: ComponentFixture<EditorToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
