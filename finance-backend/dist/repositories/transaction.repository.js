"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class TransactionRepository {
    async findById(id) {
        return prisma_1.default.transaction.findUnique({ where: { id } });
    }
    async findByUserId(userId, filters = {}) {
        const where = { userId };
        if (filters.type) {
            where.type = filters.type;
        }
        if (filters.category) {
            where.category = filters.category;
        }
        // Handle month/year filtering
        if (filters.month && filters.year) {
            where.date = {
                gte: new Date(filters.year, filters.month - 1, 1),
                lt: new Date(filters.year, filters.month, 1),
            };
        }
        else {
            // Handle date range filtering if month/year not specified
            if (filters.startDate || filters.endDate) {
                where.date = {};
                if (filters.startDate) {
                    where.date.gte = filters.startDate;
                }
                if (filters.endDate) {
                    where.date.lte = filters.endDate;
                }
            }
        }
        const skip = (filters.page ?? 1 - 1) * (filters.limit ?? 10);
        const take = filters.limit ?? 10;
        const [data, total] = await prisma_1.default.$transaction([
            prisma_1.default.transaction.findMany({
                where,
                skip,
                take,
                orderBy: {
                    [filters.sortBy ?? "date"]: filters.sortOrder ?? "desc",
                },
            }),
            prisma_1.default.transaction.count({ where }),
        ]);
        return { data, total };
    }
    async create(data) {
        return prisma_1.default.transaction.create({
            data,
        });
    }
    async update(id, data) {
        return prisma_1.default.transaction.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.default.transaction.delete({
            where: { id },
        });
    }
}
exports.TransactionRepository = TransactionRepository;
