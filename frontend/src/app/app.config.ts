import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { productReducer } from './store/product/product.reducer';

import { ProductEffects } from './store/product/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      products: productReducer,
    }),

    provideEffects([ProductEffects]),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
