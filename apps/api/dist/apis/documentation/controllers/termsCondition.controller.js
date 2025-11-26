"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTerms = exports.createOrUpdateTerms = void 0;
const termsCondition_model_1 = require("../models/termsCondition.model");
const termsCondition_validator_1 = require("../validators/termsCondition.validator");
const createOrUpdateTerms = async (req, res) => {
    var _a, _b;
    try {
        const addedBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const validated = termsCondition_validator_1.termsConditionSchema.parse({
            title: req.body.title,
            content: req.body.content,
            accepted: (_b = req.body.accepted) !== null && _b !== void 0 ? _b : false,
        });
        let doc = await termsCondition_model_1.TermsCondition.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            doc.accepted = validated.accepted;
            doc.updatedAt = new Date();
            doc.addedBy = addedBy;
            await doc.save();
            return res.status(200).json({
                message: "Terms & Conditions updated",
                data: doc,
            });
        }
        doc = await termsCondition_model_1.TermsCondition.create({
            ...validated,
            addedBy,
        });
        return res.status(201).json({
            message: "Terms & Conditions created",
            data: doc,
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
};
exports.createOrUpdateTerms = createOrUpdateTerms;
const getTerms = async (_req, res) => {
    try {
        const doc = await termsCondition_model_1.TermsCondition.findOne();
        if (!doc)
            return res.status(404).json({ message: "No Terms & Conditions found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getTerms = getTerms;
