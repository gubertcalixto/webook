import { TestBed } from '@angular/core/testing';

import { ExternalAuthenticationService } from './external-authentication.service';

describe('ExternalAuthenticationService', () => {
  let service: ExternalAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
