"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const category_service_1 = require("../services/category.service");
const response_1 = require("../utils/response");
const category_validator_1 = require("../validators/category.validator");
const categoryService = new category_service_1.CategoryService();
const createCategory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        // Validate request body
        const parseResult = category_validator_1.categorySchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await categoryService.createUserCategory(userId, parseResult.data);
        return res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const type = req.query.type;
        const result = await categoryService.getUserCategories(userId, type);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCategories = getCategories;
const updateCategory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const { id } = req.params;
        const categoryId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
        if (!categoryId) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Category ID is required", ["id"]));
        }
        // Validate request body
        const parseResult = category_validator_1.categorySchema.partial().safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await categoryService.updateCategory(categoryId, userId, parseResult.data);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const { id } = req.params;
        const categoryId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
        if (!categoryId) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Category ID is required", ["id"]));
        }
        await categoryService.deleteCategory(categoryId, userId);
        return res.status(200).json(response_1.ApiResponseBuilder.success("Category deleted successfully"));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
