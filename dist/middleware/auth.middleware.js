"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
                errors: ["Authentication token is required"],
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt_1.JwtUtil.verify(token);
        // Attach user info to request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
            errors: ["Invalid or expired token"],
        });
    }
};
exports.authenticate = authenticate;
