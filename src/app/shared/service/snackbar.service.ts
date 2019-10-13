import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject = new Subject<any>();
  public snackbarState = this.snackbarSubject.asObservable();

  constructor() { }

  show(message: string, type?: string) {
    console.log('showing snackbar');
    this.snackbarSubject.next({
      show: true,
      message,
      type
    });
  }
}
