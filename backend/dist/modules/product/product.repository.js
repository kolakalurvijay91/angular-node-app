"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_model_1 = require("./product.model");
class ProductRepository {
    async create(productData) {
        return product_model_1.Product.create(productData);
    }
    async findAll(page, limit, category) {
        const skip = (page - 1) * limit;
        const filter = category ? { category } : {};
        const [products, total] = await Promise.all([
            product_model_1.Product.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            product_model_1.Product.countDocuments(filter),
        ]);
        return {
            products,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        return product_model_1.Product.findById(id).lean();
    }
    async update(id, productData) {
        return product_model_1.Product.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true,
        }).lean();
    }
    async delete(id) {
        return product_model_1.Product.findByIdAndDelete(id);
    }
}
exports.ProductRepository = ProductRepository;
