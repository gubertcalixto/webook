import { TestBed } from '@angular/core/testing';

import { TccEditorService } from './tcc-editor.service';

describe('TccEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccEditorService = TestBed.get(TccEditorService);
    expect(service).toBeTruthy();
  });
});
