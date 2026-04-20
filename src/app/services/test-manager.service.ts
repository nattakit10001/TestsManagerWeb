import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TestManagerModel } from '../models/test-managerer.model';

@Injectable({
  providedIn: 'root',
})
export class TestManagerService {

  url:string = environment.apiBaseUrl + '/Tests';
  list: TestManagerModel[] = [];
  formData: TestManagerModel = new TestManagerModel();

  constructor(private http: HttpClient) {}

  refreshList() {
    return this.http.get(this.url).pipe(
      tap(res => {
        this.list = res as TestManagerModel[];
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  postTest(model: TestManagerModel) {
    return this.http.post(this.url, model);
  }

  deleteTest(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}