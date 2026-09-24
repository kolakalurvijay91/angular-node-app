import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-page/product-page').then((m) => m.ProductPage),
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./pages/product-form-page/product-form-page').then((m) => m.ProductFormPage),
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/product-form-page/product-form-page').then((m) => m.ProductFormPage),
  },
];
