"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ourservice_model_1 = __importDefault(require("../models/ourservice.model"));
class OurServiceService {
    // CREATE
    async create(data) {
        const newService = new ourservice_model_1.default(data);
        return newService.save();
    }
    // GET ALL → sabko accessible
    // async getAll(): Promise<IOurService[]> {
    //   return OurService.find().populate("addedBy", "name email").sort({ createdAt: -1 });
    // }
    async getAll(addedBy) {
        return ourservice_model_1.default.find({ addedBy }).sort({ createdAt: -1 });
    }
    // GET BY ID
    async getById(id) {
        return ourservice_model_1.default.findById(id).populate("addedBy", "name email");
    }
    // UPDATE
    async updateById(id, data) {
        return ourservice_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    // DELETE
    async deleteById(id) {
        return ourservice_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new OurServiceService();
