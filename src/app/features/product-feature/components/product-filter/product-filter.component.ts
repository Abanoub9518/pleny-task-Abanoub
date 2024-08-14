import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { setSearchQuery } from "../../product-store/product.actions";

@Component({
  selector: "app-product-filter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-filter.component.html",
  styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent {
  productCategories = [
    { title: "All", count: 240, value: "" },
    { title: "Smartphones", count: 9, value: "Smartphones" },
    { title: "Laptops", count: 12, value: "Laptops" },
    { title: "Fragrances", count: 8, value: "Fragrances" },
    { title: "Skincare", count: 16, value: "Skincare" },
    { title: "Groceries", count: 12, value: "Groceries" },
    { title: "Home decoration", count: 4, value: "Home decoration" },
    { title: "Furniture", count: 4, value: "Furniture" },
    { title: "Tops", count: 42, value: "Tops" },
    { title: "Women’s dresses", count: 40, value: "Women’s dresses" },
    { title: "Women’s shoes", count: 12, value: "Women’s shoes" },
  ];

  constructor(private store: Store) {}
  filter(query: string): void {
    this.store.dispatch(setSearchQuery({ query }));
  }
}
