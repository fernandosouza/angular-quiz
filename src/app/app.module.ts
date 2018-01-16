import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { QuestionService } from './question/question.service';
import { OptionService } from './option/option.service';
import { OptionListComponent } from './option/option-list.component';
import { QuestionCreatorService } from 'app/question-creator/question-creator.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionCreatorComponent,
    OptionListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    QuestionService,
    OptionService,
    QuestionCreatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
