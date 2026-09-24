import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(selectProductState, (state) => state.products);

export const selectLoading = createSelector(selectProductState, (state) => state.loading);

export const selectError = createSelector(selectProductState, (state) => state.error);

export const selectTotal = createSelector(selectProductState, (state) => state.total);

export const selectPage = createSelector(selectProductState, (state) => state.page);

export const selectLimit = createSelector(selectProductState, (state) => state.limit);

export const selectTotalPages = createSelector(selectProductState, (state) => state.totalPages);

export const selectCreating = createSelector(selectProductState, (state) => state.creating);

export const selectUpdating = createSelector(selectProductState, (state) => state.updating);

export const selectDeleting = createSelector(selectProductState, (state) => state.deleting);

// export const selectSuccessMessage = createSelector(
//   selectProductState,
//   (state) => state.successMessage,
// );

export const selectProductById = (id: string) =>
  createSelector(selectProducts, (products) => products.find((product) => product._id === id));

export const selectSelectedProduct = createSelector(
  selectProductState,
  (state) => state.selectedProduct,
);
