import { TestBed } from '@angular/core/testing';

import { ForgetpasswordserviceService } from './forgetpasswordservice.service';

describe('ForgetpasswordserviceService', () => {
  let service: ForgetpasswordserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetpasswordserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
