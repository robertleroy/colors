import { TestBed } from '@angular/core/testing';

import { RybService } from './ryb.service';

describe('RybService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RybService = TestBed.get(RybService);
    expect(service).toBeTruthy();
  });
});
