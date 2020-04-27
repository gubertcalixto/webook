import { TestBed } from '@angular/core/testing';

import { TccSharedService } from './tcc-shared.service';

describe('TccSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccSharedService = TestBed.get(TccSharedService);
    expect(service).toBeTruthy();
  });
});
