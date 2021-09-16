import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

import {CurrentUser} from "../_models/current-user";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  login(credentials: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, credentials);
  }

  signUp(user: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/sign-up`, user).pipe(map(response => {
      const currentUser: CurrentUser = response.user;
      if (currentUser?.token) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      return currentUser;
    }));
  }

}
