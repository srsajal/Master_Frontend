import { TestBed } from '@angular/core/testing';

import { MasterSCHEMEHEADService } from './master-schemehead.service';

describe('MasterSCHEMEHEADService', () => {
  let service: MasterSCHEMEHEADService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSCHEMEHEADService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
