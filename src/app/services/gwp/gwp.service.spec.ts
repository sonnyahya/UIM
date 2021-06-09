import { TestBed } from '@angular/core/testing';

import { GwpService } from './Gwp.service';

describe('GwpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GwpService = TestBed.get(GwpService);
    expect(service).toBeTruthy();
  });
});
