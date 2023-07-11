import { TestBed } from '@angular/core/testing';

import { ListNoteServiceService } from './list-note-service.service';

describe('ListNoteServiceService', () => {
  let service: ListNoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListNoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
