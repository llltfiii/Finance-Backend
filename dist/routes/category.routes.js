"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.use(auth_middleware_1.authenticate);
router.post("/", category_controller_1.createCategory);
router.get("/", category_controller_1.getCategories);
router.put("/:id", category_controller_1.updateCategory);
router.delete("/:id", category_controller_1.deleteCategory);
