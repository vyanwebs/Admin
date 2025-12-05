"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.updateCartItem = exports.getCartItemById = exports.getAllCartItems = exports.createCart = void 0;
const cart_service_1 = require("../services/cart.service");
//  Create a cart item
const createCart = async (req, res) => {
    try {
        // Get uploaded image URL or use from body (HTTP)
        const image = req.file
            ? `${process.env.URL}/uploads/images/${req.file.filename}`
            : req.body.image;
        const cartData = { ...req.body, image };
        const newCart = await (0, cart_service_1.createCart)(cartData);
        res.status(201).json({
            success: true,
            message: "Cart item added successfully",
            data: newCart,
        });
    }
    catch (error) {
        console.error("Create cart error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add item",
            error,
        });
    }
};
exports.createCart = createCart;
// ✅ Get all cart items
const getAllCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const carts = await (0, cart_service_1.getAllCarts)(userId);
        res.status(200).json({ success: true, data: carts });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart items",
            error,
        });
    }
};
exports.getAllCartItems = getAllCartItems;
//  Get cart by ID
const getCartItemById = async (req, res) => {
    try {
        const cart = await (0, cart_service_1.getCartById)(req.params.id);
        if (!cart)
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        res.status(200).json({ success: true, data: cart });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error,
        });
    }
};
exports.getCartItemById = getCartItemById;
//  Update cart
const updateCartItem = async (req, res) => {
    try {
        const image = req.file
            ? `${process.env.URL}/uploads/images/${req.file.filename}`
            : req.body.image;
        const updated = await (0, cart_service_1.updateCartById)(req.params.id, { ...req.body, image });
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update cart",
            error,
        });
    }
};
exports.updateCartItem = updateCartItem;
// Delete cart
const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const deleted = await (0, cart_service_1.deleteCartById)(req.params.id, userId);
        if (!deleted)
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        res
            .status(200)
            .json({ success: true, message: "Cart deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete cart",
            error,
        });
    }
};
exports.deleteCartItem = deleteCartItem;
