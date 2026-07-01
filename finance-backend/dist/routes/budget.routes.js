"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRouter = void 0;
const express_1 = __importDefault(require("express"));
const budget_controller_1 = require("../controllers/budget.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.budgetRouter = router;
router.use(auth_middleware_1.authenticate);
router.get("/", budget_controller_1.getBudgets);
router.post("/", budget_controller_1.createBudget);
router.get("/comparison", budget_controller_1.getBudgetComparison);
router.put("/:id", budget_controller_1.updateBudget);
router.delete("/:id", budget_controller_1.deleteBudget);
