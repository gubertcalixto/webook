import { TestBed } from '@angular/core/testing';

import { RouterHistoryService } from './router-history.service';

describe('RouterHistoryService', () => {
  let service: RouterHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
