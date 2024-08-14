import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions"; // Adjust the path as needed
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../auth-service/auth.service";
import { AuthResponse } from "../models/auth.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService
          .login(action.username, action.password, action.expiresInMins)
          .pipe(
            map((authResponse: AuthResponse) =>
              AuthActions.loginSuccess({ authResponse })
            ),
            tap(() => this.router.navigate(["/home"])), // Navigate after success action
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );
}
