"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpay_controller_1 = require("../controller/razorpay.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const router = express_1.default.Router();
// razorpay routes
router.post("/generate-order-id", auth_middleware_1.protect, razorpay_controller_1.generateOrderId);
router.post("/verify-order-id", auth_middleware_1.protect, razorpay_controller_1.verifyOrderId);
router.post("/refund", auth_middleware_1.protect, razorpay_controller_1.refundPayment);
exports.default = router;
