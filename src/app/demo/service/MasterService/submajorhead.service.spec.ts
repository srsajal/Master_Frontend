import { TestBed } from '@angular/core/testing';

import { SubmajorheadService } from './submajorhead.service';

describe('SubmajorheadService', () => {
  let service: SubmajorheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmajorheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
