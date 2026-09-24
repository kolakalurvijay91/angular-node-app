import { Product } from "./product.model";
import { IProduct } from "./product.types";

export class ProductRepository {
  async create(productData: IProduct) {
    return Product.create(productData);
  }

  async findAll(page: number, limit: number, category?: string) {
    const skip = (page - 1) * limit;

    const filter = category ? { category } : {};

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    return Product.findById(id).lean();
  }

  async update(id: string, productData: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    }).lean();
  }

  async delete(id: string) {
    return Product.findByIdAndDelete(id);
  }
}
