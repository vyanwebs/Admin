import mongoose, { Types } from "mongoose";

export interface IWalletTransaction {
	title: string;
	price: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	userId: Types.ObjectId;
	color: string;
}

const walletTransactionSchema = new mongoose.Schema<IWalletTransaction>(
	{
		title: { type: String, required: true },
		price: { type: String, required: true },
		date: { type: Date, required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		color: { type: String },
	},
	{ timestamps: true }
);

export const WalletTransaction = mongoose.model(
	"WalletTransaction",
	walletTransactionSchema
);
