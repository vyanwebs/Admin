import mongoose, { Schema, Types } from "mongoose";

export interface IOrder extends Document {
	userId: Types.ObjectId;
	amount: number;
	quantity: number;
	productName: string;
	productDescription: string;
	orderCode: string;
}

const OrderSchema = new Schema<IOrder>({
	userId: { type: mongoose.Schema.ObjectId, ref: "User" },
	amount: { type: Number },
	quantity: { type: Number },
	productDescription: { type: String },
	productName: { type: String },
	orderCode: { type: String },
});

export const Order = mongoose.model("order", OrderSchema);
