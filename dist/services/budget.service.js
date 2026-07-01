"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const budget_repository_1 = require("../repositories/budget.repository");
const response_1 = require("../utils/response");
class BudgetService {
    budgetRepository;
    constructor(budgetRepository = new budget_repository_1.BudgetRepository()) {
        this.budgetRepository = budgetRepository;
    }
    async createBudget(userId, data) {
        // Check if budget already exists for this user/month/year/category
        const existing = await this.budgetRepository.findByUserId(userId, {
            month: data.month,
            year: data.year,
            categoryId: data.categoryId,
        });
        if (existing.length > 0) {
            return response_1.ApiResponseBuilder.error("Budget already exists for this month/year/category", [
                "month",
                "year",
                "categoryId",
            ]);
        }
        const budget = await this.budgetRepository.create({
            amount: data.amount,
            month: data.month,
            year: data.year,
            userId: userId,
            categoryId: data.categoryId,
        });
        return response_1.ApiResponseBuilder.success("Budget created successfully", budget);
    }
    async getUserBudgets(userId, filters = {}) {
        const budgets = await this.budgetRepository.findByUserId(userId, filters);
        return response_1.ApiResponseBuilder.success("Budgets retrieved successfully", budgets);
    }
    async updateBudget(id, userId, data) {
        // First check if budget belongs to user
        const existing = await this.budgetRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Budget not found or unauthorized", ["id"]);
        }
        const budget = await this.budgetRepository.update(id, data);
        return response_1.ApiResponseBuilder.success("Budget updated successfully", budget);
    }
    async deleteBudget(id, userId) {
        // First check if budget belongs to user
        const existing = await this.budgetRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Budget not found or unauthorized", ["id"]);
        }
        await this.budgetRepository.delete(id);
        return response_1.ApiResponseBuilder.success("Budget deleted successfully");
    }
    async getBudgetComparison(userId, month, year) {
        const comparison = await this.budgetRepository.getBudgetComparison(userId, month, year);
        return response_1.ApiResponseBuilder.success("Budget comparison retrieved successfully", comparison);
    }
}
exports.BudgetService = BudgetService;
