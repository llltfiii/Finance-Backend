"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyReport = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const response_1 = require("../utils/response");
const dashboardService = new dashboard_service_1.DashboardService();
const getMonthlyReport = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized"));
        }
        const { month, year } = req.query;
        // Use current month/year if not provided
        const now = new Date();
        const queryMonth = month ? parseInt(month) : now.getMonth() + 1;
        const queryYear = year ? parseInt(year) : now.getFullYear();
        // Validate month
        if (queryMonth < 1 || queryMonth > 12) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Invalid month"));
        }
        const result = await dashboardService.getMonthlyReport(userId, queryMonth, queryYear);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthlyReport = getMonthlyReport;
