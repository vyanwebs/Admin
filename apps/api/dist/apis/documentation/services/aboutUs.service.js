"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aboutUs_model_1 = __importDefault(require("../models/aboutUs.model"));
class AboutUsService {
    async createOrUpdate(data) {
        let doc = await aboutUs_model_1.default.findOne({ addedBy: data.addedBy });
        if (doc) {
            doc.title = data.title;
            doc.content = data.content;
            await doc.save();
            return doc;
        }
        const newDoc = new aboutUs_model_1.default(data);
        return newDoc.save();
    }
    async getByUser(addedBy) {
        return aboutUs_model_1.default.findOne({ addedBy });
    }
}
exports.default = new AboutUsService();
