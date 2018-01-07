import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import { Question } from 'app/models';

const POST_URL = 'http://localhost:8080/addQuestion/';
const GET_URL = 'http://localhost:8080/questions';
const DELETE_URL = 'http://localhost:8080/question';

@Injectable()
export class QuestionService {
  private questions: Question[] = [];
  @Output() questionsLoaded = new EventEmitter<Question[]>()

  constructor(private http: Http) { }

  /**
   * Merge the current value of the private `questions` variable and notify
   * all `questionsLoaded` subscribers.
   * @param  {Question[]} questions
   * @returns void
   */
  private updateQuestions(questions: Question[], del?: boolean): void {
    if (!del) {
      this.questions = [...questions, ...this.questions]
    }
    else {
      this.questions = this.questions.filter(question => question.id !== questions[0].id)
    }
    this.questionsLoaded.emit(this.questions)
  }

  /**
   * @param  {Question} question
   * @returns Observable
   */
  save(question: Question): Observable<Question> {
    if (!question) { return }
    const request = this.http.post(
      POST_URL,
      {
        text: question.text
      }
    )
    .map((response: Response) => response.json())
    .share();

    request.subscribe((question: Question) => {
      this.updateQuestions([question])
    })
    return request;
  }

  /**
   * @param  {Question} question
   * @returns Observable
   */
  delete(question: Question): Observable<Response> {
    if (!question) { return }
    const options = {
      body: { id: question.id }
    };
    const request = this.http.delete(DELETE_URL, options).share();
    request.subscribe((response: Response) => {
      this.updateQuestions([question], true)
    })
    return request;
  }

  /**
   * Request a list of Questions from the server. Stores the result in the
   * private `questions` variable.
   * @returns Observable
   */
  get(): Observable<Response> {
    const request = this.http.get(GET_URL)
      .map((response: Response) => response.json())
      .share();

    request.subscribe((questions: Question[]) => {
      this.updateQuestions(questions)
    })
    return request;
  }

  /**
   * @returns Question
   */
  getQuestions(): Question[] {
    return this.questions;
  }

}
