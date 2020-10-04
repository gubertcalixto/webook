import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDenounceModalComponent } from './editor-denounce-modal.component';

describe('EditorDenounceModalComponent', () => {
  let component: EditorDenounceModalComponent;
  let fixture: ComponentFixture<EditorDenounceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDenounceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDenounceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
