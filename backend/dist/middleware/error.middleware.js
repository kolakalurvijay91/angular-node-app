"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = require("./AppError");
const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof AppError_1.AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });
        return;
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
};
exports.errorMiddleware = errorMiddleware;
