import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      _res.status(400).json({
        message: "Validation failed",
        errors,
      });

      return;
    }

    req.body = result.data;

    next();
  };
};
