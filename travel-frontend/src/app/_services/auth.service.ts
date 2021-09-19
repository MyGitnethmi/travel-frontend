import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

import {CurrentUser} from "../_models/current-user";
import {environment} from "../../environments/environment.prod";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private socialAuth: SocialAuthService
  ) {
  }

  setUser(response: any): CurrentUser {
    const currentUser: CurrentUser = response.user;
    if (currentUser?.token) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return currentUser;
  }

  login(credentials: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, credentials).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  signUp(user: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/sign-up`, user).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  getGoogleUser(): Promise<SocialUser> {
    return this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  googleSignIn(user: SocialUser): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/google-sign-in`, user).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  linkGoogleAccount(user: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/link-google`, user).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  sendPasswordResetEmail(username: string): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/send-password-reset-email`, {username});
  }

  resetPassword(data: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/reset-password`, data).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  logOut(): void {
    this.socialAuth.signOut().then(() => {
        console.log('signed out..!')
      }
    );
  }

  get details(): CurrentUser | null {
    try {
      return JSON.parse(<string>localStorage.getItem('currentUser'));
    } catch (error) {
      return null;
    }
  }

  get token(): string | undefined {
      return this.details?.token;
  }

}
