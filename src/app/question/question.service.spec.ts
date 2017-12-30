import { TestBed, fakeAsync } from '@angular/core/testing';
import { 
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let backend: MockBackend;

  const singleMockResponse = [{'id': 1, 'text': 'Test'}]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        QuestionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    backend = TestBed.get(MockBackend);
    service = TestBed.get(QuestionService);
  });

  it('should return a list of questions', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(singleMockResponse)
      }));
    })

    service.get().subscribe(questions => {
      expect(questions.length).toEqual(1);
    });
  }));

  it('should return the ID and the Text of the questions', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(singleMockResponse)
      }));
    })

    service.get().subscribe(questions => {
      expect(questions[0].id).toEqual(1);
      expect(questions[0].text).toEqual('Test');
    });
  }));

  it('should be possible to get the question list after it has being loaded', fakeAsync(() => {
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(singleMockResponse)
      }));
    })

    service.get()

    const questions = service.getQuestions();

    expect(questions[0].id).toEqual(1);
    expect(questions[0].text).toEqual('Test');
  }));
});