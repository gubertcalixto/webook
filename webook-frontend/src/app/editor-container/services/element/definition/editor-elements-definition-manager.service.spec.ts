import { TestBed } from '@angular/core/testing';

import { EditorElementsDefinitionManagerService } from './editor-elements-definition-manager.service';

describe('EditorElementsManagerService', () => {
  let service: EditorElementsDefinitionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorElementsDefinitionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
