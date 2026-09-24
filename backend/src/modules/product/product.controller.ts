import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProductService } from "./product.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../middleware/AppError";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.productService.createProduct(req.body);

    res.status(201).json(product);
  });

  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);

    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const result = await this.productService.getAllProducts(
      page,
      limit,
      category,
    );

    res.status(200).json(result);
  });

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = await this.productService.getProductById(id.toString());

    res.status(200).json(product);
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = await this.productService.updateProduct(
      id.toString(),
      req.body,
    );

    res.status(200).json(product);
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      throw new AppError("Invalid product ID", 400);
    }

    await this.productService.deleteProduct(id.toString());

    res.status(204).send();
  });
}
