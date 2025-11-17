"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ourservice_model_1 = __importDefault(require("../models/ourservice.model"));
class OurServiceService {
    async create(data) {
        const newService = new ourservice_model_1.default(data);
        return newService.save();
    }
    async getByUser(userId) {
        return ourservice_model_1.default.find({ addedBy: userId })
            .populate("addedBy", "name email")
            .sort({ createdAt: -1 });
    }
    async deleteById(id) {
        return ourservice_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new OurServiceService();
