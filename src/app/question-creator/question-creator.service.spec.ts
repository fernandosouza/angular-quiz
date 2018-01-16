import { TestBed, inject } from '@angular/core/testing';

import { QuestionCreatorService } from './question-creator.service';

describe('QuestionCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionCreatorService]
    });
  });

  it('should be created', inject([QuestionCreatorService], (service: QuestionCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
