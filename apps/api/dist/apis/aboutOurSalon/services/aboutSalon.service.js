"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aboutSalon_model_1 = __importDefault(require("../models/aboutSalon.model"));
class AboutSalonService {
    async create(data) {
        const salon = new aboutSalon_model_1.default(data);
        return salon.save();
    }
    // async getAll(): Promise<IAboutSalon[]> {
    //   return AboutSalon.find().sort({ createdAt: -1 });
    // }
    async getAll(addedBy) {
        return aboutSalon_model_1.default.find({ addedBy }).sort({ createdAt: -1 });
    }
    async getById(id) {
        return aboutSalon_model_1.default.findById(id);
    }
    async updateById(id, data) {
        return aboutSalon_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return aboutSalon_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new AboutSalonService();
