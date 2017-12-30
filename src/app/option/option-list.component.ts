import { Component, Input } from '@angular/core';
import { OptionService } from './option.service';

@Component({
  selector: 'app-option-list',
  template: `
    <ul>
      <li *ngFor="let option of options; let i = index">
        <label *ngIf="option">
          <input type="radio" name="option_{{ i }}" value="{{ option.id }}" />
          {{option.text}}
        </label>
        <button (click)="remove(option)" *ngIf="editMode" type="button">
          Delete
        </button>
      </li>
    </ul>
  `
})
export class OptionListComponent {
  @Input() options: any;
  @Input() editMode: boolean = false;

  constructor(private optionService: OptionService) { }

  remove(option) {
    this.optionService.remove(option).subscribe(data => {
      this.options = this.options.splice(option.id, 1);
    });
  }
}