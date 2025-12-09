import { Request, Response } from "express";
import User from "../../userApi/models/User.model";
import { WalletTransaction } from "../model/wallet.transaction.model";
import mongoose from "mongoose";
import { InAppNotifications } from "../../inAppNotification/models/inAppNotification.model";

export const addToWallet = async (req: Request, res: Response) => {
	const txn = await mongoose.startSession();
	txn.startTransaction();
	try {
		const { amount } = req.body;
		const userId = req.user.id;
		const updatedAmount = await User.findByIdAndUpdate(
			userId,
			{ $inc: { wallet: amount } },
			{ new: true, session: txn }
		);
		if (!updatedAmount) {
			await txn.abortTransaction();
			txn.endSession();
			return res
				.status(404)
				.json({ success: false, message: "Error Updating amount" });
		}

		const walletTxn = new WalletTransaction({
			title: "Wallet Balance",
			price: `+ ₹${amount}`,
			date: Date.now(),
			userId: userId,
			color: "green",
		});
		await walletTxn.save({ session: txn });

		const notification = new InAppNotifications({
			message: `₹${amount} has been added to your wallet`,
			userId: userId,
		});

		await notification.save({ session: txn });

		await txn.commitTransaction();
		txn.endSession();
		return res.status(200).json({
			success: true,
			message: "Amount has been updated successfully!!",
			data: updatedAmount,
		});
	} catch (error) {
		await txn.abortTransaction();
		txn.endSession();
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};

export const getWalletTransactions = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const totalWalletAmount = await User.findById(userId);

		const transactions = await WalletTransaction.find({
			userId,
		});
		return res.status(200).json({
			success: true,
			message: "Transaction fetched successfully",
			data: { transactions, totalWalletAmount: totalWalletAmount?.wallet ?? 0 },
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};
