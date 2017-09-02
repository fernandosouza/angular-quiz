import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

const ADD_OPTION_URL = 'http://localhost:8080/addOption/'

@Injectable()
export class OptionService {

  constructor(private http: Http) { }

  save(options: Array<{text: string}>, questionId: number): Observable<any> {
    const request = this.http.post(ADD_OPTION_URL, { options })
      .map(res => res.json())
      .share();

    request.subscribe(data => {
      console.log(data);
    });

    return request;
  }

}