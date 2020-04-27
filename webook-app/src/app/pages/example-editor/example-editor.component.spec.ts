import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleEditorComponent } from './example-editor.component';

describe('ExampleEditorComponent', () => {
  let component: ExampleEditorComponent;
  let fixture: ComponentFixture<ExampleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
