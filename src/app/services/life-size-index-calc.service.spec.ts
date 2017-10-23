import { TestBed, inject } from '@angular/core/testing';

import { LifeSizeIndexCalcService } from './life-size-index-calc.service';

describe('LifeSizeIndexCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LifeSizeIndexCalcService]
    });
  });

  it('should be created', inject([LifeSizeIndexCalcService], (service: LifeSizeIndexCalcService) => {
    expect(service).toBeTruthy();
  }));
});
