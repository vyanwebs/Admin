import { Request, Response } from "express";
import User from "../../userApi/models/User.model";
import { Order } from "../model/order.model";
import { Types } from "mongoose";

// buy product
export const buyProduct = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);
		const { productName, amount, productDescription, quantity } = req.body;

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
		const order = await Order.create({
			userId: new Types.ObjectId(userId as string),
			amount,
			quantity,
			productDescription,
			productName,
		});

		const uniquePart = order._id.toString().slice(-6).toUpperCase();
		order.orderCode = `NAU${uniquePart}`;

		await order.save();

		return res.status(200).json({ success: true, data: order });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

// update product order by id

export const editProductOrderById = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const { orderId } = req.params;
		const { productName, productDescription, amount, quantity } = req.body;

		const user = await User.findById(userId);
		const order = await Order.findById(orderId);

		if (!order) {
			return res
				.status(404)
				.json({ success: false, message: "Order not found" });
		}

		user!.wallet = (user?.wallet ?? 0) + order.amount;

		// Step 2: Check if new amount is affordable
		if (amount > (user?.wallet ?? 0)) {
			return res
				.status(403)
				.json({ success: false, message: "Insufficient balance" });
		}

		// Step 3: Deduct new amount
		user!.wallet = (user?.wallet ?? 0) - amount;

		// Step 4: Update order
		order.productName = productName;
		order.productDescription = productDescription;
		order.amount = amount;
		order.quantity = quantity;

		await user?.save();
		await order.save();

		return res.status(200).json({
			success: true,
			message: "Order updated successfully",
			data: order,
			wallet: user?.wallet,
		});
	} catch (error) {
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
