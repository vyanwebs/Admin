import { Schema, model } from "mongoose";

const packageSchema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		estimatedTime: { type: Number, required: true },
		services: { type: [String], default: [] },
		about: { type: String, required: true },
		image: { type: String, required: true },
		discount: { type: String },
		review: { type: Number, default: 0 },
		rating: { type: Number, default: 0 },
		gender: { type: String, required: true },

		addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

export default model("Package", packageSchema);
