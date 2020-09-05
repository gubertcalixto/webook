import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPropertiesContainerComponent } from './editor-properties-container.component';

describe('EditorPropertiesContainerComponent', () => {
  let component: EditorPropertiesContainerComponent;
  let fixture: ComponentFixture<EditorPropertiesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPropertiesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPropertiesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
