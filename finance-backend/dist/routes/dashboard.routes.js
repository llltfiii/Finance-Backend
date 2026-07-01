"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.dashboardRouter = router;
router.use(auth_middleware_1.authenticate);
router.get("/", dashboard_controller_1.getDashboardSummary);
router.get("/report", dashboard_controller_1.getMonthlyReport);
