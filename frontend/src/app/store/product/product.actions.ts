import { createAction, props } from '@ngrx/store';

import { Product, ProductResponse } from '../../features/products/models/product.model';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{
    page: number;
    limit: number;
    category?: string;
  }>(),
);

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{
    response: ProductResponse;
  }>(),
);

export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{
    error: string;
  }>(),
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{
    product: Product;
  }>(),
);

export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{
    product: Product;
  }>(),
);

export const createProductFailure = createAction(
  '[Product API] Create Product Failure',
  props<{
    error: string;
  }>(),
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{
    id: string;
    product: Partial<Product>;
  }>(),
);

export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{
    product: Product;
  }>(),
);

export const updateProductFailure = createAction(
  '[Product API] Update Product Failure',
  props<{
    error: string;
  }>(),
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{
    id: string;
  }>(),
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{
    id: string;
  }>(),
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Product Failure',
  props<{
    error: string;
  }>(),
);

export const loadProductById = createAction(
  '[Product] Load Product By Id',
  props<{
    id: string;
  }>(),
);

export const loadProductByIdSuccess = createAction(
  '[Product API] Load Product By Id Success',
  props<{
    product: Product;
  }>(),
);

export const loadProductByIdFailure = createAction(
  '[Product API] Load Product By Id Failure',
  props<{
    error: string;
  }>(),
);
