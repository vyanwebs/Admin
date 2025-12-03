"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productPackage_model_1 = __importDefault(require("../models/productPackage.model"));
const create = async (data) => {
    const newPackage = new productPackage_model_1.default(data);
    return await newPackage.save();
};
//  Get all packages (no filter)
// const getAll = async (): Promise<IProductPackage[]> => {
//   return await ProductPackage.find().sort({ createdAt: -1 });
// };
const getAll = async (addedBy) => {
    return await productPackage_model_1.default.find({ addedBy }).sort({ createdAt: -1 });
};
const getById = async (id) => {
    return await productPackage_model_1.default.findById(id);
};
const updateById = async (id, data) => {
    return await productPackage_model_1.default.findByIdAndUpdate(id, data, { new: true });
};
const deleteById = async (id) => {
    return await productPackage_model_1.default.findByIdAndDelete(id);
};
exports.default = { create, getAll, getById, updateById, deleteById };
