import { Request, Response } from "express";
import User from "../../userApi/models/User.model";

export const addToWallet = async (req: Request, res: Response) => {
	try {
		const { amount } = req.body;
		const userId = req.user.id;
		const updatedAmount = await User.findByIdAndUpdate(
			userId,
			{ $set: { wallet: amount } },
			{ new: true, upsert: true }
		);
		if (!updatedAmount) {
			return res
				.status(404)
				.json({ success: false, message: "Error Updating amount" });
		}
		return res.status(200).json({
			success: true,
			message: "Amount has been updated successfully!!",
			data: updatedAmount,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: (error as Error).message });
	}
};
