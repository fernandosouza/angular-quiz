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

  it('should inform if the question has no options', () => {
    component.question = {
      text: 'Opa'
    }
    fixture.detectChanges();
    const textElement = fixture.debugElement.query(By.css('.no-option-feedback'));
    expect(textElement.nativeElement.textContent).toContain('There is no option');
  });

  it('should render the list of options if there is nothing to render', () => {
    component.question = {
      text: 'Opa'
    }
    fixture.detectChanges();
    const textElement = fixture.debugElement.query(By.css('.options-list'));
    expect(textElement).toBeNull();
  });
});
