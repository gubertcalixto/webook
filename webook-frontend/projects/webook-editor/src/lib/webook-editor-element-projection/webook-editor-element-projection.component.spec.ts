import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebookEditorElementProjectionComponent } from './webook-editor-element-projection.component';

describe('WebookEditorElementProjectionComponent', () => {
  let component: WebookEditorElementProjectionComponent;
  let fixture: ComponentFixture<WebookEditorElementProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebookEditorElementProjectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebookEditorElementProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
