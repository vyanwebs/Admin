"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const termsCondition_model_1 = __importDefault(require("../models/termsCondition.model"));
class TermsConditionService {
    async createOrUpdate(data) {
        let doc = await termsCondition_model_1.default.findOne({ addedBy: data.addedBy });
        if (doc) {
            doc.title = data.title;
            doc.content = data.content;
            doc.accepted = data.accepted;
            await doc.save();
            return doc;
        }
        const newDoc = new termsCondition_model_1.default(data);
        return newDoc.save();
    }
    async getOne(addedBy) {
        return termsCondition_model_1.default.findOne({ addedBy });
    }
}
exports.default = new TermsConditionService();
