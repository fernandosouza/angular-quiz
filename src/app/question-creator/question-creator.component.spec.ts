import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { QuestionCreatorComponent } from './question-creator.component';
import { QuestionService } from '../question/question.service';
import { OptionService } from '../option/option.service';

describe('QuestionCreatorComponent', () => {
  let component: QuestionCreatorComponent;
  let fixture: ComponentFixture<QuestionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        QuestionService,
        OptionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
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
