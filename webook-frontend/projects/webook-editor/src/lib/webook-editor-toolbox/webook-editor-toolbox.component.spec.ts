import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebookEditorToolboxComponent } from './webook-editor-toolbox.component';

describe('WebookEditorToolboxComponent', () => {
  let component: WebookEditorToolboxComponent;
  let fixture: ComponentFixture<WebookEditorToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebookEditorToolboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebookEditorToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
