import { TestBed } from '@angular/core/testing';

import { TccPexelsService } from './tcc-pexels.service';

describe('TccPexelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccPexelsService = TestBed.inject(TccPexelsService);
    expect(service).toBeTruthy();
  });
});
