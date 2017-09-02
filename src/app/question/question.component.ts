import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  styleUrls: ['./question.component.css'],
  template: `
  <article class="question card">
    <div class="card-body">
      <h5 class="card-title">{{ question ? question.text : '' }}</h5>
      <div class="options-list" *ngIf="question && question.ops">
        <ul>
          <li *ngFor="let option of question.ops">
            <label *ngIf="option">
              <input type="radio" name="option_{{question.id}}" value="{{option.id}}" />
              {{option.text}}
            </label>
          </li>
        </ul>
      </div>
      <p class="no-option-feedback alert alert-light" *ngIf="question && !question.ops">There is no option</p>
    </div>
  </article>
  `
})
export class QuestionComponent implements OnInit {
  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
