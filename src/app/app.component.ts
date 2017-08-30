import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { QuestionService } from './question.service';
import { OptionService } from './option.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    QuestionService,
    OptionService
  ]
})
export class AppComponent implements OnInit {
  title = 'app';

  private questions;
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

  constructor(private http: Http, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.loadQuestions();
    this.questionService.questionsUpdated.subscribe(questions => this.questions = questions)
  }

  loadQuestions(): void {
    let ids;
    this.questionService.get()
      .subscribe(data => {
        ids = data.map(question => {
          return question.id;
        });
        // this.getOptionsToQuestion(ids);
      });
  }

  getOptionsToQuestion(id: Number) {
    this.http.get('http://localhost:8080/question/' + id)
      .map(res => res.json())
      .subscribe(data => {
        this.questions = this.questions.map(question => {
          if (question.id === id) {
            question = data;
          }
          return question;
        })
      });
  }
}
