"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, _res, next) => {
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
exports.validateBody = validateBody;
