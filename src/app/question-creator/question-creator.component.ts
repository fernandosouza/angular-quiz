import { Component } from '@angular/core';
import { QuestionService } from '../question.service';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
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
    this.options.push(this.option);
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
