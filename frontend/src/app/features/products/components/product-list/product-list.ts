import { Component, inject, output } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { loadProducts, deleteProduct } from '../../../../store/product/product.actions';

import {
  selectProducts,
  selectLoading,
  selectError,
  selectPage,
  selectTotalPages,
} from '../../../../store/product/product.selectors';

import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly store = inject(Store);

  readonly products$ = this.store.select(selectProducts);

  readonly loading$ = this.store.select(selectLoading);

  readonly error$ = this.store.select(selectError);

  readonly page$ = this.store.select(selectPage);

  readonly totalPages$ = this.store.select(selectTotalPages);

  private readonly router = inject(Router);

  page = 1;
  limit = 20;
  category = '';

  constructor() {
    this.loadPage(1);
  }

  editProduct(product: Product): void {
    if (!product._id) {
      return;
    }

    this.router.navigate(['/products', product._id, 'edit']);
  }

  deleteProduct(product: Product): void {
    if (!product._id) {
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    this.store.dispatch(
      deleteProduct({
        id: product._id,
      }),
    );
  }

  loadPage(page: number): void {
    this.page = page;

    this.store.dispatch(
      loadProducts({
        page: this.page,
        limit: this.limit,
        category: this.category || undefined,
      }),
    );
  }
}
