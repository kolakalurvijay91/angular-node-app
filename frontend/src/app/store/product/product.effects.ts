import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';

import {
  createProduct,
  createProductFailure,
  createProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
  loadProductById,
  loadProductByIdSuccess,
  loadProductByIdFailure,
} from './product.actions';

import { ProductService } from '../../features/products/services/product.service';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);

  private readonly productService = inject(ProductService);

  // GET PRODUCTS

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),

      switchMap(({ page, limit, category }) =>
        this.productService.getProducts(page, limit, category).pipe(
          map((response) =>
            loadProductsSuccess({
              response,
            }),
          ),

          catchError(() =>
            of(
              loadProductsFailure({
                error: 'Failed to load products',
              }),
            ),
          ),
        ),
      ),
    );
  });

  // CREATE PRODUCT

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProduct),

      switchMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((createdProduct) =>
            createProductSuccess({
              product: createdProduct,
            }),
          ),

          catchError(() =>
            of(
              createProductFailure({
                error: 'Failed to create product',
              }),
            ),
          ),
        ),
      ),
    );
  });

  // UPDATE PRODUCT

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),

      switchMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          map((updatedProduct) =>
            updateProductSuccess({
              product: updatedProduct,
            }),
          ),

          catchError(() =>
            of(
              updateProductFailure({
                error: 'Failed to update product',
              }),
            ),
          ),
        ),
      ),
    );
  });

  // DELETE PRODUCT

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),

      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() =>
            deleteProductSuccess({
              id,
            }),
          ),

          catchError(() =>
            of(
              deleteProductFailure({
                error: 'Failed to delete product',
              }),
            ),
          ),
        ),
      ),
    );
  });
  loadProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProductById),

      switchMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map((product) =>
            loadProductByIdSuccess({
              product,
            }),
          ),

          catchError(() =>
            of(
              loadProductByIdFailure({
                error: 'Product not found',
              }),
            ),
          ),
        ),
      ),
    );
  });
}
