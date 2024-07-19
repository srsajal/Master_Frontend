import { TestBed } from '@angular/core/testing';

import { SubdetailheadService } from './subdetailhead.service';

describe('SubdetailheadService', () => {
  let service: SubdetailheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdetailheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
