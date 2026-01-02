import { Schema, model, Types } from "mongoose";

export interface IUserHomeService {
  userId: Types.ObjectId;
  service: {
    name: string;
    price: number;
  }[];
  amount: number;
  phoneNumber: string;
  status: "pending" | "accepted";
}

const userHomeServiceSchema = new Schema<IUserHomeService>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted",],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model<IUserHomeService>(
  "UserHomeService",
  userHomeServiceSchema
);
