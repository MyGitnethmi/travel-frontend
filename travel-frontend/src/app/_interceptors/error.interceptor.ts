import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      if (error.status === 0) {
        return throwError({message: 'Network connection failure..!', status: 0});
      } else if (error.status === 440) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      const err = {
        message: error.error?.message || error.statusText,
        status: error.status
      };
      return throwError(err);
    }));
  }
}
