import { TestBed } from '@angular/core/testing';

import { PatientDetailsService } from './patient-details.service';

describe('PatientDetailsService', () => {
  let service: PatientDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
