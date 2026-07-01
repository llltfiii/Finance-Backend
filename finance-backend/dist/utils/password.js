"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtil = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordUtil {
    static async hash(password) {
        const saltRounds = 10;
        return bcrypt_1.default.hash(password, saltRounds);
    }
    static async compare(password, hashed) {
        return bcrypt_1.default.compare(password, hashed);
    }
}
exports.PasswordUtil = PasswordUtil;
