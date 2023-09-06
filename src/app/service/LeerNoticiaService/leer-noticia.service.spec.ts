import { TestBed } from '@angular/core/testing';

import { LeerNoticiaService } from './leer-noticia.service';

describe('LeerNoticiaService', () => {
  let service: LeerNoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeerNoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
