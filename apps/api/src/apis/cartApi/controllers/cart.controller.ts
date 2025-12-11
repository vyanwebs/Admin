import { Request, Response } from "express";
import {
	createCart as createCartService,
	getAllCarts,
	getCartById,
	updateCartById,
	deleteCartById,
} from "../services/cart.service";
import mongoose, { Types } from "mongoose";
import User from "../../userApi/models/User.model";
import { Order } from "../../ordersApi/model/order.model";
import { WalletTransaction } from "../../walletApi/model/wallet.transaction.model";
//  Create a cart item
// export const createCart = async (req: Request, res: Response) => {
// 	try {
// 		// Get uploaded image URL or use from body (HTTP)
// 		const image = req.file
// 			? `${process.env.URL}/uploads/images/${req.file.filename}`
// 			: req.body.image;

// 		const cartData = { ...req.body, image };
// 		const newCart = await createCartService(cartData);
// 		res.status(201).json({
// 			success: true,
// 			message: "Cart item added successfully",
// 			data: newCart,
// 		});
// 	} catch (error) {
// 		console.error("Create cart error:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to add item",
// 			error,
// 		});
// 	}
// };

// cart using order model
export const createCart = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();
	// txn.startTransaction({
	// 	readConcern: { level: "local" },
	// 	writeConcern: { w: "majority" },
	// });
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).session(txn);
		const {
			productName,
			amount,
			productDescription,
			quantity,
			productId,
			productPackageId,
		} = req.body;
		console.log("🚀 ~ buyProduct ~ body:", req.body);

		const cleanProductId = productId || undefined;
		const cleanPackageId = productPackageId || undefined;

		if (!!cleanProductId === !!cleanPackageId) {
			await txn.abortTransaction();
			txn.endSession();

			return res.status(403).json({
				success: false,
				message: "Send only one: productId OR productPackageId",
			});
		}

		if (!productDescription || !productName || !amount || !quantity) {
			return res
				.status(400)
				.json({ success: false, message: "Required Fields are missing" });
		}

		const order = new Order({
			userId: new Types.ObjectId(userId as string),
			amount,
			quantity,
			productDescription,
			productName,
			orderStatus: "Cart",
			...(productId && { productId: new Types.ObjectId(productId) }),
			...(productPackageId && {
				productPackageId: new Types.ObjectId(productPackageId),
			}),
			subAdminId: new Types.ObjectId(user?.subAdminId),
		});

		const uniquePart = order._id.toString().slice(-6).toUpperCase();
		order.orderCode = `NAU${uniquePart}`;

		await order.save({ session: txn });

		await txn.commitTransaction();
		txn.endSession();

		return res.status(200).json({ success: true, data: order });
	} catch (error) {
		await txn.abortTransaction();
		txn.endSession();
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// ✅ Get all cart items
// export const getAllCartItems = async (req: Request, res: Response) => {
// 	try {
// 		const userId = req.user.id;
// 		console.log(userId);
// 		const carts = await getAllCarts(userId);
// 		res.status(200).json({ success: true, data: carts });
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to fetch cart items",
// 			error,
// 		});
// 	}
// };

export const getAllCartItems = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const cartItems = await Order.find({ userId, orderStatus: "Cart" })
			.populate({
				path: "productId",
				select: "image",
			})
			.populate({
				path: "productPackageId",
				select: "image",
			});
		if (cartItems.length === 0) {
			return res
				.status(204)
				.json({ success: true, message: "Your cart is empty" });
		}
		return res.status(200).json({
			success: true,
			message: "Cart items fetched successfully",
			data: cartItems,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};
//  Get cart by ID
// export const getCartItemById = async (req: Request, res: Response) => {
// 	try {
// 		const cart = await getCartById(req.params.id);
// 		if (!cart)
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Cart not found" });
// 		res.status(200).json({ success: true, data: cart });
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to fetch cart",
// 			error,
// 		});
// 	}
// };

export const getCartItemById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const cartItem = await Order.findById(id)
			.populate({
				path: "productId",
				select: "image",
			})
			.populate({
				path: "productPackageId",
				select: "image",
			});
		if (!cartItem) {
			return res
				.status(204)
				.json({ success: true, message: "No cart item not found" });
		}
		return res.status(200).json({
			success: true,
			message: "Cart item fetched successfully",
			data: cartItem,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

//  Update cart
// export const updateCartItem = async (req: Request, res: Response) => {
// 	try {
// 		const image = req.file
// 			? `${process.env.URL}/uploads/images/${req.file.filename}`
// 			: req.body.image;

// 		const updated = await updateCartById(req.params.id, { ...req.body, image });
// 		if (!updated)
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Cart not found" });

// 		res.status(200).json({
// 			success: true,
// 			message: "Cart updated successfully",
// 			data: updated,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to update cart",
// 			error,
// 		});
// 	}
// };

export const updateCartItem = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();
	try {
		const userId = req.user.id;
		const { id } = req.params;
		const { productName, productDescription, amount, quantity } = req.body;

		const user = await User.findById(userId).session(txn);
		const cartItem = await Order.findById(id).session(txn);

		if (!cartItem) {
			return res
				.status(404)
				.json({ success: false, message: "Cart Item not found" });
		}

		// Step 4: Update order
		cartItem.productName = productName;
		cartItem.productDescription = productDescription;
		cartItem.amount = amount;
		cartItem.quantity = quantity;

		await user?.save({ session: txn });
		await cartItem.save({ session: txn });

		await txn.commitTransaction();
		txn.endSession();
		return res.status(200).json({
			success: true,
			message: "Cart Item updated successfully",
			data: cartItem,
			wallet: user?.wallet,
		});
	} catch (error) {
		await txn.abortTransaction();
		txn.endSession();
		return res.status(500).json({
			success: false,
			error: (error as Error).message,
		});
	}
};

// Delete cart
// export const deleteCartItem = async (req: Request, res: Response) => {
// 	try {
// 		const userId = req.user.id;
// 		console.log(userId);
// 		const deleted = await deleteCartById(req.params.id, userId);
// 		if (!deleted)
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Cart not found" });

// 		res
// 			.status(200)
// 			.json({ success: true, message: "Cart deleted successfully" });
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to delete cart",
// 			error,
// 		});
// 	}
// };

export const deleteCartItem = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const cartItem = await Order.findByIdAndDelete(id);
		if (!cartItem) {
			return res
				.status(204)
				.json({ success: true, message: "Cart item not found" });
		}
		return res.status(200).json({
			success: true,
			message: "Cart item deleted successfully",
			data: cartItem,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// delete all cart items
export const deleteAllCartItems = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const cartItems = await Order.deleteMany({
			userId,
			orderStatus: "Cart",
		});

		return res.status(200).json({
			success: true,
			message: `${cartItems.deletedCount} item(s) deleted successfully!!`,
			data: cartItems,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// make cart payment

export const cartPayment = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { amount } = req.body;
		const userId = req.user.id;

		const user = await User.findById(userId).session(session);

		const cartItems = await Order.find({
			userId,
			orderStatus: "Cart",
		}).session(session);

		if (cartItems.length === 0) {
			await session.abortTransaction();
			return res.status(400).json({ success: false, message: "Cart is empty" });
		}

		// Calculate total amount
		const totalAmount = cartItems.reduce(
			(sum, item) => sum + item.amount * item.quantity,
			0
		);

		if (Number(amount) !== totalAmount) {
			await session.abortTransaction();
			return res.status(403).json({
				success: false,
				message:
					"Input value and calculated value is not matching, data has been manipulated",
			});
		}

		// Wallet check
		if (totalAmount > user!.wallet!) {
			await session.abortTransaction();
			return res
				.status(403)
				.json({ success: false, message: "Insufficient Amount" });
		}

		// Deduct wallet
		user!.wallet! -= totalAmount;
		await user!.save({ session });

		// Update each cart item
		for (const item of cartItems) {
			const walletTxn = new WalletTransaction({
				title: `Purchase: ${item.productName}`,
				price: `- ₹${item.amount * item.quantity}`,
				date: new Date(),
				color: "red",
				userId,
			});

			item.orderStatus = "Processing";
			item.walletTxnId = walletTxn._id;

			await walletTxn.save({ session });
			await item.save({ session });
		}

		await session.commitTransaction();
		return res
			.status(200)
			.json({ success: true, message: "Payment Successful" });
	} catch (error) {
		await session.abortTransaction();
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	} finally {
		session.endSession();
	}
};
