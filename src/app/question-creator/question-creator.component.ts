import { Component, Input, ViewChild, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { QuestionService } from '../question/question.service';
import { OptionService } from '../option/option.service';

import { ElementBase } from '../app.element-base';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Question } from 'app/models';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NestedComponent,
    multi: true,
  }],
  selector: 'app-nested',
  template: `
    <input
      [(ngModel)]="value"
      required
      type="text"
      #nested="ngModel"
      placeholder="nested"
    />

    <p *ngIf="nested.touched && !nested.valid">this is required</p>
  `
})
export class NestedComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string;
  @ViewChild(NgModel) model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }
}

@Component({
  selector: 'app-question-creator',
  styleUrls: ['./question-creator.component.css'],
  template: `
  <article class="question">
    <form #f="ngForm" (submit)="saveQuestion($event)">
      <h5>
        <input
          required
          class="form-control"
          type="text"
          placeholder="Insert the question"
          name="question_text"
          [(ngModel)]="question.text"
        >
      </h5>
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let option of options; let i = index">
          <label class="sr-only" for="">Option</label>
          <input
            [(ngModel)]="option.text"
            name="option-{{i}}"
            class="form-control"
            placeholder="Type the option"
            type="text"
          >
          <input
            type="radio"
            name="correct"
            [value]="i"
            [(ngModel)]="correct"
          >
          <button
            (click)="dropOption(i)"
            type="button"
          >
            Remove
          </button>
        </li>
      </ul>
      <button
        class="btn btn-sm btn-block btn-primary"
        (click)="addOption()"
        type="button"
      >
        Add new option
      </button>
      <button
        class="btn btn-primary"
        [disabled]="f.invalid"
        >
        Save
      </button>
    </form>
    <br>
    <br>
    <br>
  </article>`
})
export class QuestionCreatorComponent {
  private question: Question = {
    text: ''
  };
  private options = [];
  private correct: string;
  private pendingRequest: boolean;

  @ViewChild('f') form: NgForm;

  constructor(
    private questionService: QuestionService,
    private optionService: OptionService
  ) { }

  addOption(): void {
    this.options = [...this.options, {}]
  }

  dropOption(i) {
    this.options.splice(i, 1);
  }

  saveQuestion($event): void {
    $event.preventDefault();
    if (!this.question.text || this.pendingRequest) { return };
    this.pendingRequest = true;
    this.questionService.save(this.question)
    .subscribe((response: Response) => {
      this.pendingRequest = false
      const question = response.json()
      if (response.ok) {
        this.saveOptions(this.options, question, this.correct)
        this.resetQuestion()
      }
    })
  }

  resetQuestion() {
    this.question.text = '';
    this.options = [];
  }

  saveOptions(options: Array<object>, question: Question, correct: string) {
    this.optionService.save(this.options, question.id, correct)
      .subscribe(data => {
        console.log(data)
      });
  }

}
