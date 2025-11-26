"use strict";
// import { Request, Response } from "express";
// import { AboutUs } from "../models/aboutUs.model";
// import { aboutUsSchema } from "../validators/aboutUs.validator";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutUs = exports.createOrUpdateAboutUs = void 0;
const aboutUs_model_1 = require("../models/aboutUs.model");
const createOrUpdateAboutUs = async (req, res) => {
    var _a;
    const customReq = req;
    try {
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id; // ⭐ SAME AS OFFER
        if (!addedBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, content } = req.body;
        let doc = await aboutUs_model_1.AboutUs.findOne();
        if (doc) {
            doc.title = title;
            doc.content = content;
            doc.addedBy = addedBy;
            await doc.save();
            return res.status(200).json({
                message: "About Us updated",
                data: doc,
            });
        }
        const newDoc = await aboutUs_model_1.AboutUs.create({
            title,
            content,
            addedBy,
        });
        return res.status(201).json({
            message: "About Us created",
            data: newDoc,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
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
