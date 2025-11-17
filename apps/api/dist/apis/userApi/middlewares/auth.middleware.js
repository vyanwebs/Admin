"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth Header received:", req.headers.authorization);
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // 	res.status(401).json({ error: "Not authorized, token missing" });
    // 	return;
    // }
    const token = req.cookies.token || (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = await User_model_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({ error: "User no longer exists" });
            return;
        }
        const currentDate = new Date();
        if (user.subscriptionEndDate) {
            if (currentDate > user.subscriptionEndDate && user.isActive) {
                user.isActive = false;
                await user.save();
            }
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
        // res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
};
exports.protect = protect;
