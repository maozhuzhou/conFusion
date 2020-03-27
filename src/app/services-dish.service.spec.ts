import { TestBed } from '@angular/core/testing';

import { ServicesDishService } from './services-dish.service';

describe('ServicesDishService', () => {
  let service: ServicesDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
