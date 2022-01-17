import { TestBed } from '@angular/core/testing';

import { MasterAllergyDataService } from './master-allergy-data.service';

describe('MasterAllergyDataService', () => {
  let service: MasterAllergyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterAllergyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
