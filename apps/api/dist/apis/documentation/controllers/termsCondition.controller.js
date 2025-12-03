"use strict";
// import { Request, Response } from "express";
// import { TermsCondition } from "../models/termsCondition.model";
// import { termsConditionSchema } from "../validators/termsCondition.validator";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerms = exports.createOrUpdateTerms = exports.createOrUpdateTermsMiddleware = void 0;
const termsCondition_service_1 = __importDefault(require("../services/termsCondition.service"));
const termsCondition_validator_1 = require("../validators/termsCondition.validator");
// ⭐ Middleware (validation + service call)  
const createOrUpdateTermsMiddleware = async (req, res, next) => {
    var _a;
    try {
        const customReq = req;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const validated = termsCondition_validator_1.termsConditionSchema.parse(req.body);
        const doc = await termsCondition_service_1.default.createOrUpdate({
            ...validated,
            addedBy,
        });
        customReq.terms = doc;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.createOrUpdateTermsMiddleware = createOrUpdateTermsMiddleware;
// ⭐ Controller (only sends response)
const createOrUpdateTerms = (req, res) => {
    return res.status(200).json({
        message: "Terms & Conditions saved successfully",
        data: req.terms,
    });
};
exports.createOrUpdateTerms = createOrUpdateTerms;
// ⭐ GET
const getTerms = async (req, res) => {
    var _a;
    try {
        const customReq = req;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        const doc = await termsCondition_service_1.default.getOne(addedBy);
        if (!doc)
            return res.status(404).json({ message: "No Terms found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getTerms = getTerms;
