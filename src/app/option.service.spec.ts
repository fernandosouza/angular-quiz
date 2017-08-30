import { TestBed, fakeAsync } from '@angular/core/testing';
import { 
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { OptionService } from './option.service';

describe('OptionService', () => {
  let service: OptionService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        OptionService,
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
    service = TestBed.get(OptionService); 
  });

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
  }));
});
