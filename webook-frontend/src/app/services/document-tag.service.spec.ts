import { TestBed } from '@angular/core/testing';

import { DocumentTagService } from './document-tag.service';

describe('DocumentTagService', () => {
  let service: DocumentTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
