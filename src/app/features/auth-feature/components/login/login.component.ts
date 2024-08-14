import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthState } from "../../auth-store/auth.reducer";
import { login } from "../../auth-store/auth.actions";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { selectAuthError } from "../../auth-store/auth.selectors";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  authError$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.authError$ = this.store.select(selectAuthError);
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(login({ username, password }));
    this.authError$.subscribe((error) => {
      if (error) {
        this.errorMessage = (error as any).error.message;
      }
    });
  }
}
