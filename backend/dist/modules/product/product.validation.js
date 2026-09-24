"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Product name is required"),
    description: zod_1.z.string().trim().min(1, "Product description is required"),
    price: zod_1.z.number().nonnegative("Price cannot be negative"),
    category: zod_1.z.string().trim().min(1, "Product category is required"),
    quantity: zod_1.z
        .number()
        .int("Quantity must be an integer")
        .nonnegative("Quantity cannot be negative"),
});
exports.updateProductSchema = exports.createProductSchema.partial();
