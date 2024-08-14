import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectIsAuthenticated } from "../../../features/auth-feature/auth-store/auth.selectors";
import { ProductService } from "../../../features/product-feature/product-service/product.service";
import { setSearchQuery } from "../../../features/product-feature/product-store/product.actions";
// import { searchProducts } from "../../../features/product-feature/product-store/product.actions";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  isAuthenticated$!: Observable<boolean>;
  cartItems = 0;

  constructor(private store: Store, private productService: ProductService) {}

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value || "";
    this.store.dispatch(setSearchQuery({ query }));
  }
  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.productService.cartCount$.subscribe((count) => {
      this.cartItems = count;
    });
  }
}
