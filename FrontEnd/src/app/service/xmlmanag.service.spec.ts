import { TestBed } from '@angular/core/testing';

import { XmlmanagService } from './xmlmanag.service';

describe('XmlmanagService', () => {
  let service: XmlmanagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlmanagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
