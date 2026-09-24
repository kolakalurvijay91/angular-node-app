import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { ProductForm } from '../../components/product-form/product-form';

import { loadProductById } from '../../../../store/product/product.actions';

import {
  selectSelectedProduct,
  selectLoading,
  selectError,
} from '../../../../store/product/product.selectors';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [AsyncPipe, ProductForm],
  template: `
    @if (loading$ | async) {
      <p>Loading product...</p>
    } @else {
      @if (isEditMode) {
        @if (product$ | async; as product) {
          <app-product-form [product]="product" />
        } @else {
          @if (error$ | async; as error) {
            <p>{{ error }}</p>
          }
        }
      } @else {
        <app-product-form />
      }
    }
  `,
})
export class ProductFormPage {
  private readonly route = inject(ActivatedRoute);

  private readonly store = inject(Store);

  readonly product$ = this.store.select(selectSelectedProduct);

  readonly loading$ = this.store.select(selectLoading);

  readonly error$ = this.store.select(selectError);

  readonly productId = this.route.snapshot.paramMap.get('id');

  readonly isEditMode = !!this.productId;

  constructor() {
    if (this.productId) {
      this.store.dispatch(
        loadProductById({
          id: this.productId,
        }),
      );
    }
  }
}
