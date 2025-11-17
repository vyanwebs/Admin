"use strict";
// import ProductPackage, { IProductPackage } from "../models/productPackage.model";
// import { CreateProductPackageDto, UpdateProductPackageDto } from "../dtos/productpackage.dto";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const create = async (data: CreateProductPackageDto): Promise<IProductPackage> => {
//   const newPackage = new ProductPackage(data);
//   return await newPackage.save();
// };
// const getAll = async (userId: string): Promise<IProductPackage[]> => {
//   return await ProductPackage.find({ addedBy: userId }).sort({ createdAt: -1 });
// };
// const getById = async (id: string): Promise<IProductPackage | null> => {
//   return await ProductPackage.findById(id);
// };
// const updateById = async (id: string, data: UpdateProductPackageDto): Promise<IProductPackage | null> => {
//   return await ProductPackage.findByIdAndUpdate(id, data, { new: true });
// };
// const deleteById = async (id: string): Promise<IProductPackage | null> => {
//   return await ProductPackage.findByIdAndDelete(id);
// };
// export default { create, getAll, getById, updateById, deleteById };
const productPackage_model_1 = __importDefault(require("../models/productPackage.model"));
const create = async (data) => {
    const newPackage = new productPackage_model_1.default(data);
    return await newPackage.save();
};
// ✅ Get all packages (no filter)
const getAll = async () => {
    return await productPackage_model_1.default.find().sort({ createdAt: -1 });
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
