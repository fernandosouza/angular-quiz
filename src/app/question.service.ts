import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

const POST_URL = 'http://localhost:8080/addQuestion/';
const GET_URL = 'http://localhost:8080/questions';

export interface Question {
  id?: string;
  text: string;
}

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
  private updateQuestions(questions: Question[]): void {
    this.questions = [...questions, ...this.questions]
    this.questionsLoaded.emit(this.questions)
  }

  /**
   * @param  {string} text
   * @returns Observable
   */
  save(question: Question): Observable<Response> {
    if (!question) { return };
    const request = this.http.post(POST_URL, { text: question.text }).share();
    request.subscribe((response: Response) => {
      this.updateQuestions([response.json()])
    })
    return request;
  }

  /**
   * Request a list of Questions from the server. Stores the result in the
   * update the private `questions` variable.
   * @returns Observable
   */
  get(): Observable<Response> {
    const request = this.http.get(GET_URL).share();
    request.subscribe((response: Response) => {
      this.updateQuestions(response.json())
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
