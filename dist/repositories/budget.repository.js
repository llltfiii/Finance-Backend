"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class BudgetRepository {
    async findById(id) {
        return prisma_1.default.budget.findUnique({ where: { id } });
    }
    async findByUserId(userId, filters = {}) {
        const where = { userId };
        if (filters.month) {
            where.month = filters.month;
        }
        if (filters.year) {
            where.year = filters.year;
        }
        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }
        return prisma_1.default.budget.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async create(data) {
        return prisma_1.default.budget.create({
            data,
            include: {
                category: true,
            },
        });
    }
    async update(id, data) {
        return prisma_1.default.budget.update({
            where: { id },
            data,
            include: {
                category: true,
            },
        });
    }
    async delete(id) {
        return prisma_1.default.budget.delete({
            where: { id },
        });
    }
    async getBudgetComparison(userId, month, year) {
        const budgets = await this.findByUserId(userId, { month, year });
        // Get expenses for the month grouped by category
        const expensesResult = await prisma_1.default.transaction.groupBy({
            by: ["category"],
            where: {
                userId,
                type: "EXPENSE",
                date: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1),
                },
            },
            _sum: {
                amount: true,
            },
        });
        // Transform the result to match the expected format
        const expenses = expensesResult.map((expense) => ({
            categoryId: expense.category, // Map category field to categoryId for compatibility
            amount: expense._sum.amount || 0,
        }));
        return { budget: budgets, expenses };
    }
}
exports.BudgetRepository = BudgetRepository;
