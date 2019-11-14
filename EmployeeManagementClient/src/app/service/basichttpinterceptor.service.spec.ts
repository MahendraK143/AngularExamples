import { TestBed } from '@angular/core/testing';

import { BasichttpinterceptorService } from './basichttpinterceptor.service';

describe('BasichttpinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasichttpinterceptorService = TestBed.get(BasichttpinterceptorService);
    expect(service).toBeTruthy();
  });
});
