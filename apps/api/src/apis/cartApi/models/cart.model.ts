import mongoose, { Schema } from "mongoose";
import { ICartDocument } from "../types/cart.types";

const cartSchema = new Schema<ICartDocument>(
<<<<<<< HEAD
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
=======
	{
		userId: { type: String, required: true },
		productId: { type: String, required: true },
		name: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true }
>>>>>>> b42ad895a5e21b8837a06bc225a4e6d8cd0ca969
);

export default mongoose.model<ICartDocument>("Cart", cartSchema);
