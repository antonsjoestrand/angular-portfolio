import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-type-filter',
  templateUrl: './project-type-filter.component.html'
})
export class ProjectTypeFilterComponent implements OnInit {

  @Input() defaultFilters = [];
  @Output() applied = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Desktop: [this.defaultFilters.includes('Desktop')],
      Mobile: [this.defaultFilters.includes('Mobile')],
      Design: [this.defaultFilters.includes('Design')],
    });
  }

  submit(formValue) {

    const projectTypes = Object.keys(formValue).filter(item => formValue[item]);
    
    this.applied.emit(projectTypes);
  }

}
