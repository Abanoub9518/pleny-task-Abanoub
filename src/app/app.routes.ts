import { Routes } from "@angular/router";
import { LoginComponent } from "./features/auth-feature/components/login/login.component";
import { SmartPhonesComponent } from "./features/product-feature/components/smart-phones/smart-phones.component";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", component: SmartPhonesComponent, canActivate: [authGuard] },
];
