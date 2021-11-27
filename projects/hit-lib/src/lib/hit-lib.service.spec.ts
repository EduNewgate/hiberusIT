import { TestBed } from '@angular/core/testing';

import { HitLibService } from './hit-lib.service';

describe('HitLibService', () => {
  let service: HitLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
