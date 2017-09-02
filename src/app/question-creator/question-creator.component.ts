import { Component } from '@angular/core';
import { QuestionService } from '../question.service';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-question-creator',
  styleUrls: ['./question-creator.component.css'],
  template: `
  <article class="question">
    <h5>
      <input class="form-control" (input)="onInputQuestionName($event)" type="text" placeholder="Insert the question" name="question_text">
    </h5>
    <form>
      <ul class="list-group" *ngIf="options">
        <li class="list-group-item" *ngFor="let option of options; let i = index">
          <label class="sr-only" for="">Option</label>
          <input
            class="form-control"
            placeholder="Type the option"
            type="text" name="question_option[]"
            (input)="onInputOptionText($event, i)">
        </li>
      </ul>
      <button class="btn btn-sm btn-block btn-primary" type="button" (click)="addOption()">Add new option</button>
    </form>
    <br>
    <button class="btn btn-primary" (click)="saveQuestion()" type="button">Save</button>
    <br>
    <br>
    {{ status }}
  </article>`
})
export class QuestionCreatorComponent {
  private question = {
    text: ''
  }
  private option = {
    text: ''
  }
  private options = [this.option]
  private status: string;
  private questionId: number;

  constructor(
    private questionService: QuestionService,
    private optionService: OptionService
  ) { }

  onInputQuestionName(event) {
    const value = event.currentTarget.value;
    this.question.text = value;
  }

  addOption(): void {
    this.options = [...this.options, this.option]
  }

  saveQuestion(): void {
    if (!this.question.text) { return };
    this.questionService.save(this.question.text)
      .subscribe(data => {
        if (data) {
          this.status = 'Question saved'
          this.questionId = data.insertId;
          this.saveOptions(this.options, this.questionId);
        }
        setTimeout(() => this.status = '', 2000);
      });
  }

  onInputOptionText(event, index): void {
    this.options[index].text = event.currentTarget.value;
  }

  saveOptions(options: Array<object>, questionId: number) {
    this.optionService.save(this.options, questionId)
      .subscribe(data => {
        console.log(data);
      });
  }

}
