import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TestManagerService } from '../services/test-manager.service';
import { TestManagerModel } from '../models/test-managerer.model';

@Component({
  selector: 'app-test-manager-list',
  standalone: false,
  templateUrl: './test-manager-list.component.html'
})
export class TestManagerList implements OnInit {
  public tests: TestManagerModel[] = [];

  @Output() onAddEvent = new EventEmitter<void>();

  constructor(public testManagerService: TestManagerService,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.testManagerService.deleteTest(id)
      .subscribe({
        next: () => {
          this.refreshList();
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

  refreshList() {
    this.testManagerService.refreshList()
    .subscribe({
      next: () => {
        this.changeDetector.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onAdd() {
    this.onAddEvent.emit();
  }
}
