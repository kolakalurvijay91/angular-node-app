import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product, ProductResponse } from '../models/product.model';

import { getAppConfig } from '../../../core/config/app-config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${getAppConfig().apiUrl}/products`;

  getProducts(page = 1, limit = 20, category?: string): Observable<ProductResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<ProductResponse>(this.apiUrl, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
