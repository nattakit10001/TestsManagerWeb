import { Component, EventEmitter, Output, output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TestManagerService } from '../services/test-manager.service';
import { TestManagerModel } from '../models/test-managerer.model';

@Component({
  selector: 'app-test-manager-detail',
  standalone: false,
  templateUrl: './test-manager-detail.component.html',
  styles: ``,
})
export class TestManagerDetail {
  public model: TestManagerModel = new TestManagerModel();

  @Output() onCancelEvent = new EventEmitter<void>();

  constructor(public testManagerService: TestManagerService) {
    
  }

  onSubmit(form: NgForm) {
    this.testManagerService.postTest(this.model)
    .subscribe({
      next: () => {
        form.resetForm();
        this.testManagerService.refreshList();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onAdd() {
    this.testManagerService.postTest(this.model)
    .subscribe({
      next: () => {
        this.model = new TestManagerModel();
        this.testManagerService.refreshList();
        this.onCancelEvent.emit();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onCancel() {
    this.onCancelEvent.emit();
  }
}
