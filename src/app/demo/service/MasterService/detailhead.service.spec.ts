import { TestBed } from '@angular/core/testing';

import { DetailheadService } from './detailhead.service';

describe('DetailheadService', () => {
  let service: DetailheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
