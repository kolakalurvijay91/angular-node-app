import { Component, effect, inject, input, output } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';

import { Store } from '@ngrx/store';

import { createProduct, updateProduct } from '../../../../store/product/product.actions';

import {
  selectCreating,
  selectUpdating,
  selectError,
  // selectSuccessMessage,
} from '../../../../store/product/product.selectors';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Actions, ofType } from '@ngrx/effects';

import {
  createProductSuccess,
  updateProductSuccess,
} from '../../../../store/product/product.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  // readonly successMessage$ = this.store.select(selectSuccessMessage);
  private readonly actions$ = inject(Actions);

  readonly product = input<Product | null>(null);

  readonly saved = output<void>();

  readonly productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],

    description: ['', [Validators.required]],

    price: [0, [Validators.required, Validators.min(0)]],

    category: ['', [Validators.required]],

    quantity: [0, [Validators.required, Validators.min(0)]],
  });

  readonly creating$ = this.store.select(selectCreating);

  readonly updating$ = this.store.select(selectUpdating);

  readonly error$ = this.store.select(selectError);
  submitting = false;
  successMessage = '';
  errorMessage = '';
  constructor() {
    effect(() => {
      const product = this.product();

      if (product) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
        });
      } else {
        this.productForm.reset({
          name: '',
          description: '',
          price: 0,
          category: '',
          quantity: 0,
        });
      }
    });

    this.actions$
      .pipe(ofType(createProductSuccess, updateProductSuccess), takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigate(['/products']);
      });
  }
  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const existingProduct = this.product();

    if (existingProduct?._id) {
      this.updateProduct(existingProduct._id);
    } else {
      this.createProduct();
    }
  }

  private createProduct(): void {
    this.store.dispatch(
      createProduct({
        product: this.productForm.getRawValue(),
      }),
    );
  }

  private updateProduct(id: string): void {
    this.store.dispatch(
      updateProduct({
        id,
        product: this.productForm.getRawValue(),
      }),
    );
  }

  private resetForm(): void {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      category: '',
      quantity: 0,
    });
  }
}
