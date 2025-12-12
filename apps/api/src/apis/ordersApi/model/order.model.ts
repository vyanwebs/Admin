import mongoose, { Schema, Types } from "mongoose";

export interface IOrder extends Document {
	userId: Types.ObjectId;
	amount: number;
	quantity: number;
	productName: string;
	productDescription: string;
	orderCode: string;
	productId: Types.ObjectId;
	productPackageId: Types.ObjectId;
	orderStatus: "Processing" | "Delivered" | "Cart";
	walletTxnId: Types.ObjectId;
	subAdminId: Types.ObjectId;
}

const OrderSchema = new Schema<IOrder>(
	{
		userId: { type: mongoose.Schema.ObjectId, ref: "User" },
		subAdminId: { type: mongoose.Schema.ObjectId, ref: "User" },
		amount: { type: Number },
		quantity: { type: Number },
		productDescription: { type: String },
		productName: { type: String },
		orderCode: { type: String },
		productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
		productPackageId: { type: mongoose.Schema.ObjectId, ref: "ProductPackage" },
		orderStatus: { type: String, default: "Processing" },
		walletTxnId: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

export const Order = mongoose.model("order", OrderSchema);
