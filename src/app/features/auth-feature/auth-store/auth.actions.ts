import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "../models/auth.model";

export const login = createAction(
  "[Auth] Login",
  props<{ username: string; password: string; expiresInMins?: number }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: any }>()
);
