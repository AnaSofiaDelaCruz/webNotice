import { TestBed } from '@angular/core/testing';

import { InternacionalService } from './internacional.service';

describe('InternacionalService', () => {
  let service: InternacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternacionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
