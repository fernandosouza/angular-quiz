import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../models';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  styleUrls: ['./question.component.css'],
  template: `
  <article class="question card">
    <div class="card-body">
      <h5 class="card-title">{{ question ? question.text : '' }}</h5>
      <div class="options-list" *ngIf="question && question.answers">
        <app-option-list
          [options]="question.answers"
          [editMode]="true"
        ></app-option-list>
      </div>
      <p class="no-option-feedback alert alert-light" *ngIf="!hasOptions()">There is no option</p>
      <button
        type="button"
        (click)="delete(question)"
      >Delete</button>
    </div>
  </article>
  `
})
export class QuestionComponent {
  @Input() question: Question;

  constructor(private questionService: QuestionService) { }

  delete(question: Question) {
    this.questionService.delete(question)
  }

  hasOptions() {
    return (
      this.question &&
      this.question.answers &&
      this.question.answers.length > 0
    );
  }
}
