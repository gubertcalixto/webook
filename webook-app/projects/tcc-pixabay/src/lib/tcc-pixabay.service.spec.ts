import { TestBed } from '@angular/core/testing';

import { TccPixabayService } from './tcc-pixabay.service';

describe('TccPixabayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccPixabayService = TestBed.get(TccPixabayService);
    expect(service).toBeTruthy();
  });
});
