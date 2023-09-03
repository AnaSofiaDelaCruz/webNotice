import { TestBed } from '@angular/core/testing';

import { ListarEscritoresService } from './listar-escritores.service';

describe('ListarEscritoresService', () => {
  let service: ListarEscritoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarEscritoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
