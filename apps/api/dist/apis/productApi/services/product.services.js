"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductService {
    async create(data) {
        return await product_model_1.default.create(data);
    }
    // async getAll(): Promise<IProduct[]> {
    //   return await Product.find().sort({ createdAt: -1 });
    // }
    async getAll(addedBy) {
        return product_model_1.default.find({ addedBy }).sort({ createdAt: -1 });
    }
    async getById(id) {
        return await product_model_1.default.findById(id);
    }
    async updateById(id, data) {
        return await product_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return await product_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new ProductService();
