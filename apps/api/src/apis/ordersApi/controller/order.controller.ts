import { Request, Response } from "express";
import User from "../../userApi/models/User.model";
import { Order } from "../model/order.model";
import mongoose, { Types } from "mongoose";
import { WalletTransaction } from "../../walletApi/model/wallet.transaction.model";
import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";

// buy product
export const buyProduct = async (req: Request, res: Response) => {
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
		if (amount > (user?.wallet ?? 0)) {
			return res
				.status(403)
				.json({ success: false, message: "insufficient amount" });
		}
		const order = new Order({
			userId: new Types.ObjectId(userId as string),
			amount,
			quantity,
			productDescription,
			productName,
			...(productId && { productId: new Types.ObjectId(productId) }),
			...(productPackageId && {
				productPackageId: new Types.ObjectId(productPackageId),
			}),
		});

		const uniquePart = order._id.toString().slice(-6).toUpperCase();
		order.orderCode = `NAU${uniquePart}`;

		await User.findByIdAndUpdate(
			userId,
			{
				$inc: { wallet: -amount },
			},
			{ new: true, session: txn }
		);

		const walletTxn = new WalletTransaction({
			title: `Purchase: ${productName}`,
			price: `- ₹${amount}`,
			date: Date.now(),
			userId,
		});

		order.walletTxnId = walletTxn._id;
		await walletTxn.save({ session: txn });
		await order.save({ session: txn });

		const notification = new InAppNotifications({
			message: `Your order ${order.orderCode} for ${productName} has been placed successfully.`,
			userId,
		});
		await notification.save({ session: txn });
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

// update product order by id

export const editProductOrderById = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();
	try {
		const userId = req.user.id;
		const { orderId } = req.params;
		const { productName, productDescription, amount, quantity } = req.body;

		const user = await User.findById(userId).session(txn);
		const order = await Order.findById(orderId).session(txn);

		if (!order) {
			return res
				.status(404)
				.json({ success: false, message: "Order not found" });
		}

		user!.wallet = (user?.wallet ?? 0) + order.amount;

		if (order.walletTxnId) {
			await WalletTransaction.findByIdAndDelete(order.walletTxnId, {
				session: txn,
			});
		}
		// Step 2: Check if new amount is affordable
		if (amount > (user?.wallet ?? 0)) {
			return res
				.status(403)
				.json({ success: false, message: "Insufficient balance" });
		}

		// Step 3: Deduct new amount
		user!.wallet = (user?.wallet ?? 0) - amount;

		const walletTxn = new WalletTransaction({
			title: `Updated Order: ${productName}`,
			price: `- ₹${amount}`,
			date: Date.now(),
			userId,
		});
		await walletTxn.save({ session: txn });

		// Step 4: Update order
		order.productName = productName;
		order.productDescription = productDescription;
		order.amount = amount;
		order.quantity = quantity;
		order.walletTxnId = walletTxn._id;

		await user?.save({ session: txn });
		await order.save({ session: txn });

		const notification = new InAppNotifications({
			message: `Your order ${order.orderCode} has been updated successfully.`,
			userId,
		});
		await notification.save({ session: txn });
		await txn.commitTransaction();
		txn.endSession();
		return res.status(200).json({
			success: true,
			message: "Order updated successfully",
			data: order,
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

// get all orders
export const getAllProductOrders = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const orders = await Order.find({ userId });
		if (orders.length === 0) {
			return res.status(204).json({ success: true, message: "No order found" });
		}
		return res.status(200).json({
			success: true,
			message: "Orders fetched successfully",
			data: orders,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// get product order by id

export const getOrderByOrderId = async (req: Request, res: Response) => {
	try {
		const { orderId } = req.params;
		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(204).json({ success: true, message: "No order found" });
		}
		return res.status(200).json({
			success: true,
			message: "Orders fetched successfully",
			data: order,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// delete product order by id

export const deleteOrderByOrderId = async (req: Request, res: Response) => {
	try {
		const { orderId } = req.params;
		const order = await Order.findByIdAndDelete(orderId);
		if (!order) {
			return res.status(204).json({ success: true, message: "No order found" });
		}
		return res.status(200).json({
			success: true,
			message: "Orders deleted successfully",
			data: order,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};
