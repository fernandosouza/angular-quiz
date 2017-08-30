import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { By } from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.question = {
      text: 'Opa'
    }
    fixture.detectChanges();
    const textElement = fixture.debugElement.query(By.css('.question p'));
    expect(textElement.nativeElement.textContent).toContain(component.question.text);
  });
});
