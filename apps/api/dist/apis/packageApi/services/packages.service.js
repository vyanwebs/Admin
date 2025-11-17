"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packages_model_1 = __importDefault(require("../models/packages.model"));
class PackageService {
    async create(data) {
        const newPackage = new packages_model_1.default(data);
        return await newPackage.save();
    }
    async getAll() {
        return await packages_model_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return await packages_model_1.default.findById(id);
    }
    async updateById(id, data) {
        return await packages_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return await packages_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new PackageService();
