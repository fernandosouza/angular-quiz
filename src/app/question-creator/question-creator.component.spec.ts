import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreatorComponent } from './question-creator.component';

describe('QuestionCreatorComponent', () => {
  let component: QuestionCreatorComponent;
  let fixture: ComponentFixture<QuestionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
