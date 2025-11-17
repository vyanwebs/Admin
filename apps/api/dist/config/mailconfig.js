"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const UserOTP_model_1 = require("../apis/userApi/models/UserOTP.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: email,
        subject: "Your OTP code to log in to the Naushad app is",
        text: `Your verification code is ${otp}`,
    });
    await UserOTP_model_1.EmailOTP.create({ email, otp });
    return otp;
};
exports.sendOTP = sendOTP;
