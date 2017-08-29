import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { QuestionService } from '../question.service';

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
  private questionId: Number;

  constructor(private http: Http, private questionService: QuestionService) { }

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
          // this.saveOptions();
        }
        setTimeout(() => this.status = '', 2000);
      });
  }

  onInputOptionText(event, index): void {
    this.options[index].text = event.currentTarget.value;
  }

  saveOptions() {
    this.http.get('http://localhost:8080/addOption/' + this.options[0].text + '/' + this.questionId)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

}
