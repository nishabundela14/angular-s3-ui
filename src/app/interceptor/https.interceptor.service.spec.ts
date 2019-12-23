import { TestBed } from '@angular/core/testing';

import { Https.InterceptorService } from './https.interceptor.service';

describe('Https.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Https.InterceptorService = TestBed.get(Https.InterceptorService);
    expect(service).toBeTruthy();
  });
});
