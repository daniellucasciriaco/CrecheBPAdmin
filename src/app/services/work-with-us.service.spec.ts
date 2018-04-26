import { TestBed, inject } from '@angular/core/testing';

import { WorkWithUsService } from './work-with-us.service';

describe('WorkWithUsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkWithUsService]
    });
  });

  it('should be created', inject([WorkWithUsService], (service: WorkWithUsService) => {
    expect(service).toBeTruthy();
  }));
});
