import { TestBed } from '@angular/core/testing';

import { PatientVisitService } from './patient-visit.service';

describe('PatientVisitService', () => {
  let service: PatientVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
