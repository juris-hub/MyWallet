import { TestBed } from '@angular/core/testing';

import { AddCoinService } from './add-coin.service';

describe('AddCoinService', () => {
  let service: AddCoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
