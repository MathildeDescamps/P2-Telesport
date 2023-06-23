import { TestBed } from '@angular/core/testing';

import { OlympicsService } from './olympics.service';

describe('OlympicsService', () => {
  let service: OlympicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
