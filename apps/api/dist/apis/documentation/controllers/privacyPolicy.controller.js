"use strict";
// import { Request, Response } from "express";
// import { PrivacyPolicy } from "../models/privacyPolicy.model";
// import { privacyPolicySchema } from "../validators/privacyPolicy.validator";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivacy = exports.createOrUpdatePrivacy = void 0;
const privacyPolicy_model_1 = require("../models/privacyPolicy.model");
const privacyPolicy_validator_1 = require("../validators/privacyPolicy.validator");
const createOrUpdatePrivacy = async (req, res) => {
    var _a;
    try {
        const addedBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const validated = privacyPolicy_validator_1.privacyPolicySchema.parse({
            title: req.body.title,
            content: req.body.content,
        });
        let doc = await privacyPolicy_model_1.PrivacyPolicy.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            doc.updatedAt = new Date();
            doc.addedBy = addedBy;
            await doc.save();
            return res.status(200).json({
                message: "Privacy Policy updated",
                data: doc,
            });
        }
        doc = await privacyPolicy_model_1.PrivacyPolicy.create({
            ...validated,
            addedBy,
        });
        return res.status(201).json({
            message: "Privacy Policy created",
            data: doc,
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
};
exports.createOrUpdatePrivacy = createOrUpdatePrivacy;
const getPrivacy = async (_req, res) => {
    try {
        const doc = await privacyPolicy_model_1.PrivacyPolicy.findOne();
        if (!doc)
            return res.status(404).json({ message: "No Privacy Policy found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getPrivacy = getPrivacy;
