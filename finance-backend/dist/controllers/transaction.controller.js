"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactions = exports.createTransaction = void 0;
const transaction_service_1 = require("../services/transaction.service");
const response_1 = require("../utils/response");
const transactionService = new transaction_service_1.TransactionService();
const createTransaction = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const result = await transactionService.createTransaction(userId, req.body);
        return res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const filters = {
            type: req.query.type,
            category: req.query.category,
            startDate: req.query.startDate ? new Date(req.query.startDate) : undefined,
            endDate: req.query.endDate ? new Date(req.query.endDate) : undefined,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
        };
        const result = await transactionService.getTransactions(userId, filters);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getTransactions = getTransactions;
const updateTransaction = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Transaction ID is required", ["id"]));
        }
        const result = await transactionService.updateTransaction(id, userId, req.body);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Transaction ID is required", ["id"]));
        }
        await transactionService.deleteTransaction(id, userId);
        return res.status(200).json(response_1.ApiResponseBuilder.success("Transaction deleted successfully"));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTransaction = deleteTransaction;
