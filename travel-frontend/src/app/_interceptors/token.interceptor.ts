import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.injector.get(AuthService);
    const currentUser = auth.token;
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authentication: `Bearer ${currentUser}`
        }
      })
    }
    return next.handle(request);
  }
}
