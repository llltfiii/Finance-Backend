"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repository_1 = require("../repositories/category.repository");
const response_1 = require("../utils/response");
class CategoryService {
    categoryRepository;
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async createUserCategory(userId, data) {
        const category = await this.categoryRepository.create({
            name: data.name,
            type: data.type,
            userId,
        });
        return response_1.ApiResponseBuilder.success("Category created successfully", category);
    }
    async getUserCategories(userId, type) {
        if (type) {
            const categories = await this.categoryRepository.findByUserIdAndType(userId, type);
            return response_1.ApiResponseBuilder.success("Categories retrieved successfully", categories);
        }
        else {
            const categories = await this.categoryRepository.findByUserId(userId);
            return response_1.ApiResponseBuilder.success("Categories retrieved successfully", categories);
        }
    }
    async updateCategory(id, userId, data) {
        // First check if category belongs to user
        const existing = await this.categoryRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Category not found or unauthorized", ["id"]);
        }
        const category = await this.categoryRepository.update(id, data);
        return response_1.ApiResponseBuilder.success("Category updated successfully", category);
    }
    async deleteCategory(id, userId) {
        // First check if category belongs to user
        const existing = await this.categoryRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Category not found or unauthorized", ["id"]);
        }
        await this.categoryRepository.delete(id);
        return response_1.ApiResponseBuilder.success("Category deleted successfully");
    }
}
exports.CategoryService = CategoryService;
