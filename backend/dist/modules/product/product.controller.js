"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_service_1 = require("./product.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const AppError_1 = require("../../middleware/AppError");
class ProductController {
    productService;
    constructor() {
        this.productService = new product_service_1.ProductService();
    }
    createProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const product = await this.productService.createProduct(req.body);
        res.status(201).json(product);
    });
    getAllProducts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
        const category = typeof req.query.category === "string" ? req.query.category : undefined;
        const result = await this.productService.getAllProducts(page, limit, category);
        res.status(200).json(result);
    });
    getProductById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id.toString())) {
            throw new AppError_1.AppError("Invalid product ID", 400);
        }
        const product = await this.productService.getProductById(id.toString());
        res.status(200).json(product);
    });
    updateProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id.toString())) {
            throw new AppError_1.AppError("Invalid product ID", 400);
        }
        const product = await this.productService.updateProduct(id.toString(), req.body);
        res.status(200).json(product);
    });
    deleteProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id.toString())) {
            throw new AppError_1.AppError("Invalid product ID", 400);
        }
        await this.productService.deleteProduct(id.toString());
        res.status(204).send();
    });
}
exports.ProductController = ProductController;
