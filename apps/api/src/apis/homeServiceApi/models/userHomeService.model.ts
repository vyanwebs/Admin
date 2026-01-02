import { Schema, model, Types } from "mongoose";

export interface IUserHomeService {
  userId: Types.ObjectId;
  service: Types.ObjectId;     // HomeService ID
  amount: number;
  phoneNumber: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const userHomeServiceSchema = new Schema<IUserHomeService>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "HomeService",
      required: true,
    },

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
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUserHomeService>(
  "UserHomeService",
  userHomeServiceSchema
);
