import { TestBed } from '@angular/core/testing';

import { ApiSocketService } from './api-socket.service';

describe('ApiSocketService', () => {
  let service: ApiSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
