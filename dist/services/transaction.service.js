"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_repository_1 = require("../repositories/transaction.repository");
const response_1 = require("../utils/response");
class TransactionService {
    transactionRepository;
    constructor(transactionRepository = new transaction_repository_1.TransactionRepository()) {
        this.transactionRepository = transactionRepository;
    }
    async createTransaction(userId, data) {
        const transaction = await this.transactionRepository.create({
            amount: data.amount,
            type: data.type.toUpperCase(),
            category: data.category,
            date: new Date(data.date),
            note: data.note,
            userId: userId,
            categoryId: data.categoryId,
        });
        return response_1.ApiResponseBuilder.success("Transaction created successfully", transaction);
    }
    async getTransactions(userId, filters = {}) {
        const transactions = await this.transactionRepository.findByUserId(userId, {
            page: filters.page,
            limit: filters.limit,
            type: filters.type?.toUpperCase(),
            category: filters.category,
            startDate: filters.startDate,
            endDate: filters.endDate,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
        });
        return response_1.ApiResponseBuilder.success("Transactions retrieved successfully", transactions);
    }
    async updateTransaction(id, userId, data) {
        // First check if transaction belongs to user
        const existing = await this.transactionRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Transaction not found or unauthorized", ["id"]);
        }
        const transaction = await this.transactionRepository.update(id, {
            amount: data.amount,
            type: data.type?.toUpperCase(),
            category: data.category,
            date: data.date ? new Date(data.date) : undefined,
            note: data.note,
            categoryId: data.categoryId,
        });
        return response_1.ApiResponseBuilder.success("Transaction updated successfully", transaction);
    }
    async deleteTransaction(id, userId) {
        // First check if transaction belongs to user
        const existing = await this.transactionRepository.findById(id);
        if (!existing || existing.userId !== userId) {
            return response_1.ApiResponseBuilder.error("Transaction not found or unauthorized", ["id"]);
        }
        await this.transactionRepository.delete(id);
        return response_1.ApiResponseBuilder.success("Transaction deleted successfully");
    }
}
exports.TransactionService = TransactionService;
