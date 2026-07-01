"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyReport = exports.getDashboardSummary = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const response_1 = require("../utils/response");
const dashboardService = new dashboard_service_1.DashboardService();
const getDashboardSummary = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const result = await dashboardService.getDashboardSummary(userId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardSummary = getDashboardSummary;
const getMonthlyReport = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const { month, year } = req.query;
        if (!month || !year) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Month and year are required", ["month", "year"]));
        }
        const result = await dashboardService.getMonthlyReport(userId, parseInt(month), parseInt(year));
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthlyReport = getMonthlyReport;
