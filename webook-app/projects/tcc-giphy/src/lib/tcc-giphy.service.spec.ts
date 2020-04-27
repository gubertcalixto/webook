import { TestBed } from '@angular/core/testing';

import { TccGiphyService } from './tcc-giphy.service';

describe('TccGiphyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccGiphyService = TestBed.get(TccGiphyService);
    expect(service).toBeTruthy();
  });
});
