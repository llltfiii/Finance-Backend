"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class CategoryRepository {
    async findById(id) {
        return prisma_1.default.category.findUnique({ where: { id } });
    }
    async findByUserId(userId) {
        return prisma_1.default.category.findMany({
            where: { userId },
            orderBy: { name: "asc" },
        });
    }
    async findByUserIdAndType(userId, type) {
        return prisma_1.default.category.findMany({
            where: { userId, type },
            orderBy: { name: "asc" },
        });
    }
    async create(data) {
        return prisma_1.default.category.create({
            data,
        });
    }
    async update(id, data) {
        return prisma_1.default.category.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.default.category.delete({
            where: { id },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
