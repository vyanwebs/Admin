"use strict";
// import { Request, Response } from "express";
// import { AboutUs } from "../models/aboutUs.model";
// import { aboutUsSchema } from "../validators/aboutUs.validator";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutUs = exports.createOrUpdateAboutUsMiddleware = void 0;
const aboutUs_service_1 = __importDefault(require("../services/aboutUs.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.createOrUpdateAboutUsMiddleware = [
    upload.none(),
    async (req, res) => {
        var _a;
        const customReq = req;
        try {
            const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!addedBy) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { title, content } = req.body;
            const saved = await aboutUs_service_1.default.createOrUpdate({
                title,
                content,
                addedBy: new mongoose_1.default.Types.ObjectId(addedBy),
            });
            return res.status(200).json({
                message: "About Us saved",
                data: saved,
            });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
];
const getAboutUs = async (req, res) => {
    var _a;
    try {
        const customReq = req;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const doc = await aboutUs_service_1.default.getByUser(new mongoose_1.default.Types.ObjectId(addedBy));
        if (!doc)
            return res.status(404).json({ message: "No About Us found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAboutUs = getAboutUs;
