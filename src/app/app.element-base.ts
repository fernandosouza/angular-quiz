import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray } from './app.validate';
import { ValueAccessorBase } from './app.value-accessor-base';


export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;
  // we will ultimately get these arguments from @Inject on the derived class
  constructor(private validators: ValidatorArray,
              private asyncValidators: AsyncValidatorArray) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  protected get invalid(): Observable<boolean> {
    return this.validate().pipe(map(v => Object.keys(v || {}).length > 0));
  }
}
