export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
