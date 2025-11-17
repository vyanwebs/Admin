"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutUs = exports.createOrUpdateAboutUs = void 0;
const aboutUs_model_1 = require("../models/aboutUs.model");
const aboutUs_validator_1 = require("../validators/aboutUs.validator");
const createOrUpdateAboutUs = async (req, res) => {
    try {
        const validated = aboutUs_validator_1.aboutUsSchema.parse({
            title: req.body.title,
            content: req.body.content,
        });
        let doc = await aboutUs_model_1.AboutUs.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            doc.updatedAt = new Date();
            await doc.save();
            return res.status(200).json({ message: "About Us updated", data: doc });
        }
        doc = await aboutUs_model_1.AboutUs.create(validated);
        return res.status(201).json({ message: "About Us created", data: doc });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
};
exports.createOrUpdateAboutUs = createOrUpdateAboutUs;
const getAboutUs = async (_req, res) => {
    try {
        const doc = await aboutUs_model_1.AboutUs.findOne();
        if (!doc)
            return res.status(404).json({ message: "No About Us found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAboutUs = getAboutUs;
