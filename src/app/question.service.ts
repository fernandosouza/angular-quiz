import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  constructor(private http: Http) { }

  save(text: string): Observable<any> {
    if (!text) { return };
    return this.http.post('http://localhost:8080/addQuestion/', { text })
      .map(res => res.json());
  }

}
