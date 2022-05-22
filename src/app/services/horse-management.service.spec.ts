import { TestBed } from '@angular/core/testing';

import { HorseManagementService } from './horse-management.service';

describe('HorseManagementService', () => {
  let service: HorseManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorseManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
