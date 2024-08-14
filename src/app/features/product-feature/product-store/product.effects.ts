// src/app/store/product.effects.ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  setPage,
  setPageSize,
  setSearchQuery,
} from "./product.actions";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { ProductService } from "../product-service/product.service";
import { select, Store } from "@ngrx/store";
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchQuery,
} from "./product.selectors";

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts, setPage, setPageSize, setSearchQuery),
      withLatestFrom(
        this.store.pipe(select(selectPageSize)),
        this.store.pipe(select(selectCurrentPage)),
        this.store.pipe(select(selectSearchQuery))
      ),
      mergeMap(([action, pageSize, currentPage, searchQuery]) =>
        this.productService.getAllProducts().pipe(
          tap((response) =>
            console.log("Products loaded from service:", response)
          ),

          map((response) => {
            let filteredProducts = response.products;
            if (searchQuery) {
              filteredProducts = filteredProducts.filter(
                (product: { title: string }) =>
                  product.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );
            }
            // console.log(filteredProducts);

            return loadProductsSuccess({
              products: filteredProducts,
              total: filteredProducts.length, // as here when get totalPages it appears page without data
              pageSize,
              currentPage,
            });
          }),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store
  ) {}
}
