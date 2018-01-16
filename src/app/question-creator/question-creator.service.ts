import { Injectable, EventEmitter, Output } from '@angular/core'
import { QuestionService } from 'app/question/question.service'
import { OptionService } from 'app/option/option.service'
import { Question, Option } from 'app/models'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class QuestionCreatorService {

  @Output() questionAdded = new EventEmitter<Question>()

  constructor(
    private questionService: QuestionService,
    private optionService: OptionService
  ) { }

  saveQuestion(question: Question, correct?: number): Observable<any> {
    let request = this.questionService.save(question)
    request.subscribe((response: Question) => {
      if (response && question.answers.length > 0) {
        this.saveOptions(question.answers, response, correct)
      }
      else {
        this.questionAdded.emit(question)
      }
    })
    return request
  }

  saveOptions(options: Option[], question: Question, correct: number): Observable<any> {
    let request = this.optionService.save(options, question.id, correct)
    request.subscribe(answers => {
      question.answers = answers
      this.questionAdded.emit(question)
    })
    return request
  }

}
