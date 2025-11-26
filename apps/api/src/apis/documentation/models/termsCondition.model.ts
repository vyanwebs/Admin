import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITermsCondition extends Document {
  title: string;
  content: string;
  accepted: boolean;
  updatedAt: Date;
  addedBy: Types.ObjectId;
}

const TermsConditionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    accepted: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const TermsCondition = mongoose.model<ITermsCondition>(
  "TermsCondition",
  TermsConditionSchema
);
