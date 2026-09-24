"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("./product.repository");
const AppError_1 = require("../../middleware/AppError");
class ProductService {
    productRepository;
    constructor() {
        this.productRepository = new product_repository_1.ProductRepository();
    }
    async createProduct(productData) {
        return this.productRepository.create(productData);
    }
    async getAllProducts(page, limit, category) {
        return this.productRepository.findAll(page, limit, category);
    }
    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.AppError("Product not found", 404);
        }
        return product;
    }
    async updateProduct(id, productData) {
        const product = await this.productRepository.update(id, productData);
        if (!product) {
            throw new AppError_1.AppError("Product not found", 404);
        }
        return product;
    }
    async deleteProduct(id) {
        const product = await this.productRepository.delete(id);
        if (!product) {
            throw new AppError_1.AppError("Product not found", 404);
        }
        return product;
    }
}
exports.ProductService = ProductService;
