import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styles: []
})
export class AppComponent {
  protected readonly title = signal('TestsManagerWeb');

  public showDetailFlag: boolean = false;
}
