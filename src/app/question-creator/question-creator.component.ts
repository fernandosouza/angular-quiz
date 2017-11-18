import { Component, Input, ViewChild, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { QuestionService, Question } from '../question.service';
import { OptionService } from '../option.service';

import { ElementBase } from '../app.element-base';
import { Response } from '@angular/http';

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
      placeholder="nested" />

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
    <form #f="ngForm" (submit)="saveQuestion()">
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
      <ul class="list-group" *ngIf="options">
        <li class="list-group-item" *ngFor="let option of options; let i = index">
          <label class="sr-only" for="">Option</label>
          <input
            [(ngModel)]="parent"
            name="parent"
            class="form-control"
            placeholder="Type the option"
            type="text"
            (input)="onInputOptionText($event, i)"
          >
        </li>
      </ul>
      <button
        class="btn btn-sm btn-block btn-primary"
        type="submit"
      >
        Add new option
      </button>
    </form>
    <br>
    <button
      class="btn btn-primary"
      type="submit"
      [disabled]="f.invalid"
    >
      Save
    </button>
    <br>
    <br>
  </article>`
})
export class QuestionCreatorComponent {
  private question: Question = {
    text: ''
  };
  private option = {
    text: ''
  }
  private options = [this.option]
  private questionId: number;

  constructor(
    private questionService: QuestionService,
    private optionService: OptionService
  ) { }

  addOption(): void {
    this.options = [...this.options, this.option]
  }

  saveQuestion(): void {
    if (!this.question.text) { return };
    this.questionService.save(this.question)
      .subscribe((response: Response) => {
        if (response) {
          this.saveOptions(this.options, this.questionId)
          this.resetQuestion()
        }
      })
  }

  onInputOptionText(event, index): void {
    this.options[index].text = event.currentTarget.value;
  }

  resetQuestion() {
    this.question.text = '';
  }

  saveOptions(options: Array<object>, questionId: number) {
    this.optionService.save(this.options, questionId)
      .subscribe(data => {
        console.log(data)
      });
  }

}
