"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./auth.routes");
const category_routes_1 = require("./category.routes");
const dashboard_routes_1 = require("./dashboard.routes");
const transaction_routes_1 = require("./transaction.routes");
const reports_routes_1 = require("./reports.routes");
const router = express_1.default.Router();
router.use("/auth", auth_routes_1.authRouter);
router.use("/categories", category_routes_1.categoryRouter);
router.use("/dashboard", dashboard_routes_1.dashboardRouter);
router.use("/transactions", transaction_routes_1.transactionRouter);
router.use("/reports", reports_routes_1.reportsRouter);
exports.default = router;
