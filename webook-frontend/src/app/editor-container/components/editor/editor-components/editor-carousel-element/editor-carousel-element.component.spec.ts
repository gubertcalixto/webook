import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCarouselElementComponent } from './editor-carousel-element.component';

describe('EditorCarouselElementComponent', () => {
  let component: EditorCarouselElementComponent;
  let fixture: ComponentFixture<EditorCarouselElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCarouselElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCarouselElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
