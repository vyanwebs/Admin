"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartById = exports.updateCartById = exports.getCartById = exports.getAllCarts = exports.createCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// Create a cart item
const createCart = async (data) => {
    const cartItem = new cart_model_1.default(data);
    return await cartItem.save();
};
exports.createCart = createCart;
// ✅ Get all cart items
const getAllCarts = async (userId) => {
    return await cart_model_1.default.find({ userId }).sort({ createdAt: -1 });
};
exports.getAllCarts = getAllCarts;
// Get a cart item by ID
const getCartById = async (id) => {
    return await cart_model_1.default.findById(id);
};
exports.getCartById = getCartById;
// Update a cart item
const updateCartById = async (id, data) => {
    return await cart_model_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateCartById = updateCartById;
// ✅ Delete a cart item
const deleteCartById = async (_id, userId) => {
    return await cart_model_1.default.findOneAndDelete({ _id, userId });
};
exports.deleteCartById = deleteCartById;
