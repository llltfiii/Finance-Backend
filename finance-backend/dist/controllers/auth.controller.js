"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const auth_validator_1 = require("../validators/auth.validator");
const authService = new auth_service_1.AuthService();
const register = async (req, res, next) => {
    try {
        // Validate request body
        const parseResult = auth_validator_1.registerSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await authService.register(parseResult.data);
        return res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        // Validate request body
        const parseResult = auth_validator_1.loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await authService.login(parseResult.data);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        const result = await authService.getProfile(userId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        // Validate request body
        const parseResult = auth_validator_1.updateProfileSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await authService.updateProfile(userId, parseResult.data);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json(response_1.ApiResponseBuilder.error("Unauthorized: No user ID", ["unauthorized"]));
        }
        // Validate request body
        const parseResult = auth_validator_1.changePasswordSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json(response_1.ApiResponseBuilder.error("Validation failed", parseResult.error.issues.map(issue => issue.message)));
        }
        const result = await authService.changePassword(userId, parseResult.data);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
