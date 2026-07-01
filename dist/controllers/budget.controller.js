"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetComparison = exports.deleteBudget = exports.updateBudget = exports.getBudgets = exports.createBudget = void 0;
const budget_service_1 = require("../services/budget.service");
const response_1 = require("../utils/response");
const budgetService = new budget_service_1.BudgetService();
const createBudget = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const result = await budgetService.createBudget(userId, req.body);
        return res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createBudget = createBudget;
const getBudgets = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const filters = {
            month: req.query.month ? parseInt(req.query.month) : undefined,
            year: req.query.year ? parseInt(req.query.year) : undefined,
            categoryId: req.query.categoryId,
        };
        const result = await budgetService.getUserBudgets(userId, filters);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getBudgets = getBudgets;
const updateBudget = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Budget ID is required", ["id"]));
        }
        const result = await budgetService.updateBudget(id, userId, req.body);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateBudget = updateBudget;
const deleteBudget = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Budget ID is required", ["id"]));
        }
        await budgetService.deleteBudget(id, userId);
        return res.status(200).json(response_1.ApiResponseBuilder.success("Budget deleted successfully"));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBudget = deleteBudget;
const getBudgetComparison = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const { month, year } = req.query;
        if (!month || !year) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Month and year are required", ["month", "year"]));
        }
        const result = await budgetService.getBudgetComparison(userId, parseInt(month), parseInt(year));
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getBudgetComparison = getBudgetComparison;
