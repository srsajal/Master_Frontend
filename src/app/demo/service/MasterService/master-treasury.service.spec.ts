import { TestBed } from '@angular/core/testing';

import { MasterTreasuryService } from './master-treasury.service';

describe('MasterTreasuryService', () => {
  let service: MasterTreasuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterTreasuryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
