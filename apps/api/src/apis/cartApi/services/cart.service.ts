import Cart from "../models/cart.model";
import { ICart } from "../types/cart.types";

// Create a cart item
export const createCart = async (data: Partial<ICart>) => {
	const cartItem = new Cart(data);
	return await cartItem.save();
};

<<<<<<< HEAD
// Get all cart items
export const getAllCarts = async () => {
  return await Cart.find().sort({ createdAt: -1 });
=======
// ✅ Get all cart items
export const getAllCarts = async (userId: string) => {
	return await Cart.find({ userId }).sort({ createdAt: -1 });
>>>>>>> b42ad895a5e21b8837a06bc225a4e6d8cd0ca969
};

// Get a cart item by ID
export const getCartById = async (id: string) => {
	return await Cart.findById(id);
};

// Update a cart item
export const updateCartById = async (id: string, data: Partial<ICart>) => {
	return await Cart.findByIdAndUpdate(id, data, { new: true });
};

<<<<<<< HEAD
// Delete a cart item
export const deleteCartById = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
=======
// ✅ Delete a cart item
export const deleteCartById = async (_id: string, userId: string) => {
	return await Cart.findOneAndDelete({ _id, userId });
>>>>>>> b42ad895a5e21b8837a06bc225a4e6d8cd0ca969
};
