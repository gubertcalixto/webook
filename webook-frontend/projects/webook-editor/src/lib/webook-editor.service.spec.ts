import { TestBed } from '@angular/core/testing';

import { WebookEditorService } from './webook-editor.service';

describe('WebookEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebookEditorService = TestBed.inject(WebookEditorService);
    expect(service).toBeTruthy();
  });
});
