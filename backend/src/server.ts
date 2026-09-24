import express from "express";
import cors from "cors";
import productRouter from "./modules/product/product.route";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "UP",
  });
});

app.use("/api/products", productRouter);
app.use(errorMiddleware);
export default app;
