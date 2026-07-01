"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const response_1 = require("../utils/response");
const password_1 = require("../utils/password");
const auth_repository_1 = require("../repositories/auth.repository");
class AuthService {
    authRepository;
    constructor(authRepository = new auth_repository_1.AuthRepository()) {
        this.authRepository = authRepository;
    }
    async register(data) {
        // Check if user already exists
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            return response_1.ApiResponseBuilder.error("Email is already in use", ["email"]);
        }
        // Hash password
        const hashedPassword = await password_1.PasswordUtil.hash(data.password);
        // Create user
        const user = await this.authRepository.create({
            email: data.email,
            password: hashedPassword,
            name: data.name,
        });
        // Generate token
        const token = require("../utils/jwt").JwtUtil.sign({
            id: user.id,
            email: user.email,
        });
        const { password: _, ...userWithoutPassword } = user;
        return response_1.ApiResponseBuilder.success("User registered successfully", {
            user: userWithoutPassword,
            token,
        });
    }
    async login(data) {
        // Find user
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) {
            return response_1.ApiResponseBuilder.error("Invalid email or password", ["email", "password"]);
        }
        // Check password
        const isValidPassword = await password_1.PasswordUtil.compare(data.password, user.password);
        if (!isValidPassword) {
            return response_1.ApiResponseBuilder.error("Invalid email or password", ["email", "password"]);
        }
        // Generate token
        const token = require("../utils/jwt").JwtUtil.sign({
            id: user.id,
            email: user.email,
        });
        const { password: _, ...userWithoutPassword } = user;
        return response_1.ApiResponseBuilder.success("Login successful", {
            user: userWithoutPassword,
            token,
        });
    }
    async getProfile(userId) {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            return response_1.ApiResponseBuilder.error("User not found");
        }
        const { password: _, ...userWithoutPassword } = user;
        return response_1.ApiResponseBuilder.success("User profile retrieved", userWithoutPassword);
    }
    async updateProfile(userId, data) {
        // If email is being updated, check if it's already taken
        if (data.email) {
            const existingUser = await this.authRepository.findByEmail(data.email);
            if (existingUser && existingUser.id !== userId) {
                return response_1.ApiResponseBuilder.error("Email is already in use", ["email"]);
            }
        }
        const user = await this.authRepository.update(userId, data);
        const { password: _, ...userWithoutPassword } = user;
        return response_1.ApiResponseBuilder.success("Profile updated successfully", userWithoutPassword);
    }
    async changePassword(userId, data) {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            return response_1.ApiResponseBuilder.error("User not found");
        }
        // Check current password
        const isValidPassword = await password_1.PasswordUtil.compare(data.currentPassword, user.password);
        if (!isValidPassword) {
            return response_1.ApiResponseBuilder.error("Current password is incorrect", ["currentPassword"]);
        }
        // Hash new password
        const hashedPassword = await password_1.PasswordUtil.hash(data.newPassword);
        // Update password
        await this.authRepository.updatePassword(userId, hashedPassword);
        return response_1.ApiResponseBuilder.success("Password changed successfully");
    }
}
exports.AuthService = AuthService;
