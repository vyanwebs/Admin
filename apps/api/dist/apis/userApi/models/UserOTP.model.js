"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailOTP = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const emailOTPSchema = new mongoose_1.default.Schema({
    email: { type: String },
    otp: { type: Number },
});
exports.EmailOTP = mongoose_1.default.model("emailOTP", emailOTPSchema);
