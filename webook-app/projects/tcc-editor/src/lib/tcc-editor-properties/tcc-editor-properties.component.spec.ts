import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccEditorPropertiesComponent } from './tcc-editor-properties.component';

describe('TccEditorPropertiesComponent', () => {
  let component: TccEditorPropertiesComponent;
  let fixture: ComponentFixture<TccEditorPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccEditorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccEditorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
