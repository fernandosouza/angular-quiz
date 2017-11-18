import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { QuestionService } from './question.service';
import { OptionService } from './option.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionCreatorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    QuestionService,
    OptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
