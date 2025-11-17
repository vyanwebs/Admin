"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.verifyOrderId = exports.generateOrderId = void 0;
const dotenv_1 = require("dotenv");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto = __importStar(require("crypto"));
(0, dotenv_1.config)();
const generateOrderId = async (req, res) => {
    try {
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = req.body;
        const order = await razorpay.orders.create(options);
        console.log("🚀 ~ generateOrderId ~ order:", order);
        if (!order) {
            return res
                .status(403)
                .json({ success: false, message: "Unable to generate order" });
        }
        res.status(200).json({
            success: true,
            message: "Order Generated successfully",
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.generateOrderId = generateOrderId;
const verifyOrderId = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        console.log("🚀 ~ verifyOrderId ~ sha:", sha);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");
        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }
        res.status(200).json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.verifyOrderId = verifyOrderId;
const refundPayment = async (req, res) => {
    try {
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const { paymentId } = req.body;
        if (!paymentId) {
            return res
                .status(400)
                .json({ success: false, message: "Payment ID required" });
        }
        const refund = await razorpay.payments.refund(paymentId, {
            speed: "normal",
        });
        console.log("🚀 ~ refundPayment ~ refund:", refund);
        return res.status(200).json({
            success: true,
            message: "Full refund has been initiated. The amount will reflect in your account within 7–10 business days.",
            data: refund,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Refund Initialization failed",
            error: error.message,
        });
    }
};
exports.refundPayment = refundPayment;
