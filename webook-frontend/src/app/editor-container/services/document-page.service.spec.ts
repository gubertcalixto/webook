import { TestBed } from '@angular/core/testing';

import { EditorDocumentPageService } from './document-page.service';

describe('DocumentPageService', () => {
  let service: EditorDocumentPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorDocumentPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
