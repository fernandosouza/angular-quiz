import { Component, Input, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ElementBase } from 'app/app.element-base';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Question, Option } from 'app/models';
import { QuestionCreatorService } from './question-creator.service';

@Component({
  selector: 'app-question-creator',
  styleUrls: ['./question-creator.component.css'],
  templateUrl: './question-creator.component.html' 
})
export class QuestionCreatorComponent {
  private question: Question = {
    text: '',
    answers: [
      {
        text: '',
        correct: false
      } as Option
    ]
  };
  private correct: string;
  private pendingRequest: boolean;

  @ViewChild('f') form: NgForm;

  constructor(
    private questionCreatorService: QuestionCreatorService
  ) { }

  addOption(): void {
    this.question.answers = [...this.question.answers, { text: '' }]
  }

  dropOption(i) {
    this.question.answers.splice(i, 1);
  }

  saveQuestion($event): void {
    $event.preventDefault();
    if (!this.question.text || this.pendingRequest) { return };
    this.pendingRequest = true;
    this.questionCreatorService.saveQuestion({...this.question})
      .subscribe(data => {
        this.pendingRequest = false;
        this.resetQuestion()
      }
    );
  }

  resetQuestion() {
    this.question = {
      text: '',
      answers: [
        {
          text: '',
          correct: false
        } as Option
      ]
    }
  }

}
