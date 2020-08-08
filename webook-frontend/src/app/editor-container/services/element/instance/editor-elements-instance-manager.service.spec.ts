import { TestBed } from '@angular/core/testing';

import { EditorElementsInstanceManagerService } from './editor-elements-instance-manager.service';

describe('EditorElementsInstanceManagerService', () => {
  let service: EditorElementsInstanceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorElementsInstanceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
