import { TestBed } from '@angular/core/testing';

import { FetchLoanConstraintsService } from './fetch-loan-constraints.service';

describe('FetchLoanConstraintsService', () => {
  let service: FetchLoanConstraintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchLoanConstraintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
