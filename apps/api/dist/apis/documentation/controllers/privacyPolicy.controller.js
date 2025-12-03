"use strict";
// import { Request, Response } from "express";
// import { PrivacyPolicy } from "../models/privacyPolicy.model";
// import { privacyPolicySchema } from "../validators/privacyPolicy.validator";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivacy = exports.createOrUpdatePrivacyMiddleware = void 0;
const privacyPolicy_service_1 = __importDefault(require("../services/privacyPolicy.service"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// ✅ Create / Update Privacy Policy
exports.createOrUpdatePrivacyMiddleware = [
    upload.none(),
    async (req, res) => {
        var _a;
        try {
            const customReq = req;
            const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!addedBy) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { title, content } = req.body;
            const saved = await privacyPolicy_service_1.default.createOrUpdate({
                title,
                content,
                addedBy: new mongoose_1.default.Types.ObjectId(addedBy),
            });
            return res.status(200).json({
                message: "Privacy Policy saved",
                data: saved,
            });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
];
// ✅ Get Privacy Policy
const getPrivacy = async (req, res) => {
    var _a;
    try {
        const customReq = req;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const doc = await privacyPolicy_service_1.default.getOne(new mongoose_1.default.Types.ObjectId(addedBy));
        if (!doc) {
            return res.status(404).json({ message: "No Privacy Policy found" });
        }
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getPrivacy = getPrivacy;
