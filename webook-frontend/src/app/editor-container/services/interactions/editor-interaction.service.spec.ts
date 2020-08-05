import { TestBed } from '@angular/core/testing';

import { EditorInteractionService } from './editor-interaction.service';

describe('EditorInteractionService', () => {
  let service: EditorInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
