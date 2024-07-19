import { TestBed } from '@angular/core/testing';

import { MinorheadService } from './minorhead.service';

describe('MinorheadService', () => {
  let service: MinorheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinorheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
