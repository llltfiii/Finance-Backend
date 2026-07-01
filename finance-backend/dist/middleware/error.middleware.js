"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || [message];
    res.status(statusCode).json({
        success: false,
        message,
        errors: Array.isArray(errors) ? errors : [errors],
    });
};
exports.errorHandler = errorHandler;
// 404 handler
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        errors: [`Cannot ${req.method} ${req.path}`],
    });
};
exports.notFound = notFound;
