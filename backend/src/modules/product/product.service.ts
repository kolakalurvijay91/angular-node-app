import { ProductRepository } from "./product.repository";
import { IProduct } from "./product.types";
import { AppError } from "../../middleware/AppError";

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData: IProduct) {
    console.log({ productData });
    return this.productRepository.create(productData);
  }

  async getAllProducts(page: number, limit: number, category?: string) {
    return this.productRepository.findAll(page, limit, category);
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async updateProduct(id: string, productData: Partial<IProduct>) {
    const product = await this.productRepository.update(id, productData);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
