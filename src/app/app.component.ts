import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { QuestionService, Question } from './question.service';
import { OptionService } from './option.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <main class="container">
    <header>
      <h1>Howzit Quiz</h1>
      <app-question-creator></app-question-creator>
      <app-question
        *ngFor="let question of questions"
        [question]="question">
      </app-question>
    </header>
  </main>`
})
export class AppComponent implements OnInit {
  title = 'app';

  private questions: Question[];
  private options = [
    {
      text: 'This is the text',
      value: '1'
    }, {
      text: 'This is the text',
      value: '2'
    }, {
      text: 'This is the text',
      value: '3'
    }
  ];

  constructor(
    private http: Http,
    private questionService: QuestionService) {
  }

  ngOnInit() {
    this.loadQuestions();
    this.questionService.questionsLoaded.subscribe(
      questions => this.questions = questions
    );
  }

  loadQuestions(): void {
    this.questionService.get()
  }

  // This method should load options for the question
  getOptionsToQuestion(ids: number[]) {
    this.http.get('http://localhost:8080/question/' + ids)
      .subscribe((response: Response) => {
        const data = response.json();
        if (this.questions) {
          this.questions = this.questions.map(question => {
            if (question.id === data.id) {
              question = data;
            }
            return question;
          })
        }
      });
  }
}
