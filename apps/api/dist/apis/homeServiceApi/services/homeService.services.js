"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeService_model_1 = __importDefault(require("../models/homeService.model"));
class HomeServiceService {
    async create(data) {
        const service = new homeService_model_1.default(data);
        return service.save();
    }
    async getAll() {
        return homeService_model_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return homeService_model_1.default.findById(id);
    }
    async updateById(id, data) {
        return homeService_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return homeService_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new HomeServiceService();
