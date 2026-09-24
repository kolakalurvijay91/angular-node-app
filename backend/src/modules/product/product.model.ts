import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.types";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      rquired: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);
productSchema.index({
  category: 1,
  createdAt: -1,
});
export const Product = mongoose.model<IProduct>("product", productSchema);
