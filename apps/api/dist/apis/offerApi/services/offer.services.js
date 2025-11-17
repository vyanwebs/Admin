"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const offer_model_1 = __importDefault(require("../models/offer.model"));
class OfferService {
    async create(data) {
        const newOffer = new offer_model_1.default(data);
        return newOffer.save();
    }
    async getAll() {
        return offer_model_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return offer_model_1.default.findById(id);
    }
    async updateById(id, data) {
        return offer_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return offer_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new OfferService();
