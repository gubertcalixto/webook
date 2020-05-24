import { TestBed } from '@angular/core/testing';

import { OauthManagerService } from './oauth-manager.service';

describe('OauthManagerService', () => {
  let service: OauthManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
