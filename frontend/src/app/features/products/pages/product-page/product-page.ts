import { Component } from '@angular/core';

import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductList],
  template: `
    <h1>Products</h1>

    <app-product-list />
  `,
})
export class ProductPage {}
