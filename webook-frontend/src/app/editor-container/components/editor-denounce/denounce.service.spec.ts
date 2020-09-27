import { TestBed } from '@angular/core/testing';

import { DenounceService } from './denounce.service';

describe('DenounceService', () => {
  let service: DenounceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenounceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
