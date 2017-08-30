import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

const POST_URL = 'http://localhost:8080/addQuestion/';
const GET_URL = 'http://localhost:8080/questions';

@Injectable()
export class QuestionService {
  private questions = [];
  @Output() questionsUpdated = new EventEmitter();

  constructor(private http: Http) { }

  private setQuestions(questions: object[]): void {
    this.questions = [...questions, ...this.questions]
    this.questionsUpdated.emit(this.questions)
  }

  save(text: string): Observable<any> {
    if (!text) { return };
    let request = this.http.post(POST_URL, { text })
      .map(res => res.json())
      .share();

    request.subscribe(data => {
      this.setQuestions([data]);
    })
    return request;
  }

  get(): Observable<any> {
    let request = this.http.get(GET_URL)
      .map(questions => questions.json())

    request.subscribe(data => {
      this.setQuestions(data);
    })
    return request;
  }

  getQuestions() {
    return this.questions;
  }

}
