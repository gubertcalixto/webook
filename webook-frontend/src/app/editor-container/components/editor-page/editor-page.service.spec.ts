import { TestBed } from '@angular/core/testing';

import { EditorPageService } from './editor-page.service';

describe('EditorPageService', () => {
  let service: EditorPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
