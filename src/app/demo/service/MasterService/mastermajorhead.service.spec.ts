import { TestBed } from '@angular/core/testing';

import { MastermajorheadService } from './mastermajorhead.service';

describe('MastermajorheadService', () => {
  let service: MastermajorheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastermajorheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
