import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: object): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', credentials);
  }

}
