"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionIdSchema = exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be a positive number"),
    type: zod_1.z.enum(["income", "expense"], { message: "Type must be either 'income' or 'expense'" }),
    category: zod_1.z.string().min(1, "Category is required"),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    note: zod_1.z.string().optional(),
});
exports.transactionIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid transaction ID"),
});
