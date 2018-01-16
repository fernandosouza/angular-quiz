import { Component, OnInit } from '@angular/core';
import { Question } from 'app/models';
import { QuestionService } from './question/question.service';
import { QuestionCreatorService } from 'app/question-creator/question-creator.service';

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

  constructor(
    private questionCreatorService: QuestionCreatorService,
    private questionService: QuestionService
  ) {
  }

  ngOnInit() {
    this.loadQuestions();
    this.questionCreatorService.questionAdded.subscribe(
      question => this.questions = [question, ...this.questions]
    );
  }

  loadQuestions(): void {
    this.questionService.get().subscribe(
      questions => this.questions = questions
    )
  }
}
