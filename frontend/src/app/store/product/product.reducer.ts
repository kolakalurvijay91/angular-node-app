import { createReducer, on } from '@ngrx/store';

import {
  createProduct,
  createProductFailure,
  createProductSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  loadProductById,
  loadProductByIdSuccess,
  loadProductByIdFailure,
} from './product.actions';

import { Product } from '../../features/products/models/product.model';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;

  total: number;
  page: number;
  limit: number;
  totalPages: number;

  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;

  error: string | null;
  successMessage: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: null,

  total: 0,
  page: 1,
  limit: 20,
  totalPages: 0,

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
  successMessage: null,
};

export const productReducer = createReducer(
  initialProductState,

  // Loading starts
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Loading succeeds
  on(loadProductsSuccess, (state, { response }) => ({
    ...state,

    products: response.products,
    total: response.total,
    page: response.page,
    limit: response.limit,
    totalPages: response.totalPages,

    loading: false,
    error: null,
  })),

  // Loading fails
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create succeeds
  on(createProduct, (state) => ({
    ...state,
    creating: true,
    error: null,
  })),

  on(createProductSuccess, (state, { product }) => ({
    ...state,

    products: [product, ...state.products],

    total: state.total + 1,

    creating: false,
    error: null,
  })),

  on(createProductFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error,
  })),

  // Update succeeds
  on(updateProduct, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),

  on(updateProductSuccess, (state, { product }) => ({
    ...state,

    products: state.products.map((existingProduct) =>
      existingProduct._id === product._id ? product : existingProduct,
    ),

    updating: false,
    error: null,
  })),

  on(updateProductFailure, (state, { error }) => ({
    ...state,
    updating: false,
    error,
  })),

  // Delete succeeds
  on(deleteProduct, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })),

  on(deleteProductSuccess, (state, { id }) => ({
    ...state,

    products: state.products.filter((product) => product._id !== id),

    total: Math.max(state.total - 1, 0),

    deleting: false,
    error: null,
  })),

  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    deleting: false,
    error,
  })),
  on(loadProductById, (state) => ({
    ...state,
    loading: true,
    selectedProduct: null,
    error: null,
  })),

  on(loadProductByIdSuccess, (state, { product }) => ({
    ...state,

    selectedProduct: product,

    loading: false,
    error: null,
  })),

  on(loadProductByIdFailure, (state, { error }) => ({
    ...state,

    selectedProduct: null,

    loading: false,
    error,
  })),
);
