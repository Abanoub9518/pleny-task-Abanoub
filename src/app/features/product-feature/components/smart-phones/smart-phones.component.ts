import { Component } from "@angular/core";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "../../../../core/components/paginator/paginator.component";
import { Observable } from "rxjs";
import { Product } from "../../product-models/product.model";
import { Store } from "@ngrx/store";
import {
  loadProducts,
  setPage,
  setPageSize,
} from "../../product-store/product.actions";
import {
  selectCurrentPage,
  selectPageSize,
  selectProducts,
  selectTotalPages,
} from "../../product-store/product.selectors";
import { ProductService } from "../../product-service/product.service";

@Component({
  selector: "app-smart-phones",
  standalone: true,
  imports: [
    ProductFilterComponent,
    ProductCardComponent,
    CommonModule,
    PaginatorComponent,
  ],
  templateUrl: "./smart-phones.component.html",
  styleUrl: "./smart-phones.component.scss",
})
export class SmartPhonesComponent {
  products$: Observable<Product[]>;
  total$: Observable<number>;
  page$: Observable<number>;
  pageSize$: Observable<number>;
  // loading$: Observable<boolean>;

  constructor(private store: Store, private productService: ProductService) {
    this.products$ = this.store.select(selectProducts);
    this.total$ = this.store.select(selectTotalPages);
    this.page$ = this.store.select(selectCurrentPage);
    this.pageSize$ = this.store.select(selectPageSize);
    // this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onPageChanged(page: number): void {
    this.store.dispatch(setPage({ page }));
    this.store.dispatch(loadProducts());
  }

  onPageSizeChange(pageSize: number): void {
    this.store.dispatch(setPageSize({ pageSize }));
    this.store.dispatch(loadProducts());
  }

  onFilterChange(input: any) {}
  onAddToCart(): void {
    this.productService.addToCart(1);
  }
}
