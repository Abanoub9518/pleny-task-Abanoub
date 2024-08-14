import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { LoginComponent } from "./features/auth-feature/components/login/login.component";
import { ProductCardComponent } from "./features/product-feature/components/product-card/product-card.component";
import { ProductFilterComponent } from "./features/product-feature/components/product-filter/product-filter.component";
import { PaginatorComponent } from "./core/components/paginator/paginator.component";
import { LoaderComponent } from "./core/components/loader/loader.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProductCardComponent,
    ProductFilterComponent,
    PaginatorComponent,
    LoaderComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "pleny-task";
}
