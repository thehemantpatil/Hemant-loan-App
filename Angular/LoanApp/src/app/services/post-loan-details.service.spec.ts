import { TestBed } from '@angular/core/testing';

import { PostLoanDetailsService } from './post-loan-details.service';

describe('PostLoanDetailsService', () => {
  let service: PostLoanDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostLoanDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
