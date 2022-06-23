import { TestBed } from '@angular/core/testing';

import { AccountbalanceService } from './accountbalance.service';

describe('AccountbalanceService', () => {
  let service: AccountbalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountbalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
