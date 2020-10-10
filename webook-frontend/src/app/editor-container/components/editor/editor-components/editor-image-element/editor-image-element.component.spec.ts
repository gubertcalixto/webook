import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorImageElementComponent } from './editor-image-element.component';

describe('EditorImageElementComponent', () => {
  let component: EditorImageElementComponent;
  let fixture: ComponentFixture<EditorImageElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorImageElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorImageElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
