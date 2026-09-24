import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();
import { createProductSchema, updateProductSchema } from "./product.validation";
import { validateBody } from "../../middleware/validate.middleware";

const productController = new ProductController();

router.post(
  "/",
  validateBody(createProductSchema),
  productController.createProduct,
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  validateBody(updateProductSchema),
  productController.updateProduct,
);
router.delete("/:id", productController.deleteProduct);

export default router;
