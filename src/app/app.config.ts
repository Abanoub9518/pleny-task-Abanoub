import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { authReducer } from "./features/auth-feature/auth-store/auth.reducer";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthEffects } from "./features/auth-feature/auth-store/auth.effects";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { productReducer } from "./features/product-feature/product-store/product.reducer";
import { ProductEffects } from "./features/product-feature/product-store/product.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer, products: productReducer }),
    provideEffects([AuthEffects, ProductEffects]),

    provideStoreDevtools({ maxAge: 25 }),
  ],
};
