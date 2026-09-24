import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }
  console.log(error);
  res.status(500).json({ message: "Internal Server Error" });
};
