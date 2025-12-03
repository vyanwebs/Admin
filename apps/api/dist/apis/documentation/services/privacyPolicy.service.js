"use strict";
// import mongoose from "mongoose";
// import PrivacyPolicy, { IPrivacyPolicy } from "../models/privacyPolicy.model";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const privacyPolicy_model_1 = __importDefault(require("../models/privacyPolicy.model"));
class PrivacyPolicyService {
    // Create or Update
    async createOrUpdate(data) {
        // Type-safe findOne
        let doc = await privacyPolicy_model_1.default.findOne({ addedBy: data.addedBy });
        if (doc) {
            doc.title = data.title;
            doc.content = data.content;
            await doc.save();
            return doc;
        }
        const newDoc = new privacyPolicy_model_1.default(data);
        return newDoc.save();
    }
    // Get one Privacy Policy
    async getOne(addedBy) {
        return privacyPolicy_model_1.default.findOne({ addedBy });
    }
}
exports.default = new PrivacyPolicyService();
