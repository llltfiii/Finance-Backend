"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const transaction_repository_1 = require("../repositories/transaction.repository");
const category_repository_1 = require("../repositories/category.repository");
const budget_repository_1 = require("../repositories/budget.repository");
const response_1 = require("../utils/response");
class DashboardService {
    transactionRepository;
    categoryRepository;
    budgetRepository;
    constructor(transactionRepository = new transaction_repository_1.TransactionRepository(), categoryRepository = new category_repository_1.CategoryRepository(), budgetRepository = new budget_repository_1.BudgetRepository()) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.budgetRepository = budgetRepository;
    }
    async getDashboardSummary(userId) {
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 0-indexed (1-12)
        const currentYear = now.getFullYear();
        // Get total balance, income, expense
        const transactions = await this.transactionRepository.findByUserId(userId, {
            page: 1,
            limit: 1000, // Get a large number to calculate totals
        });
        const totalIncome = transactions.data
            .filter(t => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions.data
            .filter(t => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalBalance = totalIncome - totalExpense;
        // Get monthly income and expense
        const monthlyTransactions = await this.transactionRepository.findByUserId(userId, {
            page: 1,
            limit: 1000,
            month: currentMonth,
            year: currentYear,
        });
        const monthlyIncome = monthlyTransactions.data
            .filter(t => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);
        const monthlyExpense = monthlyTransactions.data
            .filter(t => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);
        // Get expense by category
        const expenseByCategory = this.groupByCategory(transactions.data.filter(t => t.type === "EXPENSE"));
        // Get income by category
        const incomeByCategory = this.groupByCategory(transactions.data.filter(t => t.type === "INCOME"));
        // Get recent transactions (limit 5)
        const recentTransactions = transactions.data
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
        return response_1.ApiResponseBuilder.success("Dashboard summary retrieved successfully", {
            totalBalance,
            totalIncome,
            totalExpense,
            monthlyIncome,
            monthlyExpense,
            expenseByCategory,
            incomeByCategory,
            recentTransactions,
        });
    }
    async getMonthlyReport(userId, month, year) {
        // Get transactions for the specified month and year
        const transactions = await this.transactionRepository.findByUserId(userId, {
            page: 1,
            limit: 1000,
            month,
            year,
        });
        // Calculate totals
        const totalIncome = transactions.data
            .filter(t => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions.data
            .filter(t => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);
        const netIncome = totalIncome - totalExpense;
        // Get income by category
        const incomeByCategory = this.groupByCategory(transactions.data.filter(t => t.type === "INCOME"));
        // Get expense by category
        const expenseByCategory = this.groupByCategory(transactions.data.filter(t => t.type === "EXPENSE"));
        // Get monthly trend (last 6 months)
        const monthlyTrend = await this.getMonthlyTrend(userId, year, month);
        return response_1.ApiResponseBuilder.success("Monthly report retrieved successfully", {
            month,
            year,
            totalIncome,
            totalExpense,
            netIncome,
            incomeByCategory,
            expenseByCategory,
            monthlyTrend,
        });
    }
    groupByCategory(items) {
        return items.reduce((acc, item) => {
            const existing = acc.find((cat) => cat.category === item.category);
            if (existing) {
                existing.amount += item.amount;
            }
            else {
                acc.push({ category: item.category, amount: item.amount });
            }
            return acc;
        }, []);
    }
    async getMonthlyTrend(userId, currentYear, currentMonth) {
        const trend = [];
        const monthsToShow = 6;
        for (let i = 0; i < monthsToShow; i++) {
            let month = currentMonth - i;
            let year = currentYear;
            // Adjust for year wrap
            while (month <= 0) {
                month += 12;
                year--;
            }
            const transactions = await this.transactionRepository.findByUserId(userId, {
                page: 1,
                limit: 1000,
                month,
                year,
            });
            const income = transactions.data
                .filter(t => t.type === "INCOME")
                .reduce((sum, t) => sum + t.amount, 0);
            const expense = transactions.data
                .filter(t => t.type === "EXPENSE")
                .reduce((sum, t) => sum + t.amount, 0);
            trend.unshift({
                month,
                year,
                income,
                expense,
                net: income - expense,
            });
        }
        return trend;
    }
}
exports.DashboardService = DashboardService;
