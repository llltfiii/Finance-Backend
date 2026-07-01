"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseBuilder = void 0;
class ApiResponseBuilder {
    static success(message, data) {
        return {
            success: true,
            message,
            data,
        };
    }
    static error(message, errors = []) {
        return {
            success: false,
            message,
            errors,
        };
    }
}
exports.ApiResponseBuilder = ApiResponseBuilder;
