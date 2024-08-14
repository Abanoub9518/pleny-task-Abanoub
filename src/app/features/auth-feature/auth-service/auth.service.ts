import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthResponse, LoginModel } from "../models/auth.model";
import { Store } from "@ngrx/store";
import { AuthState } from "../auth-store/auth.reducer";
import { loginFailure, loginSuccess } from "../auth-store/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://dummyjson.com/auth/login";

  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  login(
    username: string,
    password: string,
    expiresInMins: number = 60
  ): Observable<AuthResponse> {
    const body = { username, password, expiresInMins };
    return this.http.post<AuthResponse>(this.apiUrl, body);
  }

  performLogin(
    username: string,
    password: string,
    expiresInMins?: number
  ): void {
    this.login(username, password, expiresInMins).subscribe({
      next: (response) =>
        this.store.dispatch(loginSuccess({ authResponse: response })),
      error: (error) => this.store.dispatch(loginFailure({ error })),
    });
  }
}
