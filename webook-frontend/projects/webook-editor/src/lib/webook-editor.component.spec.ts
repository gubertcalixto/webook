import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebookEditorComponent } from './webook-editor.component';

describe('WebookEditorComponent', () => {
  let component: WebookEditorComponent;
  let fixture: ComponentFixture<WebookEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebookEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebookEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
