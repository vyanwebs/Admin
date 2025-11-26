// import { Schema, model, Document } from "mongoose";

// export interface IPrivacyPolicy extends Document {
//   title: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const privacyPolicySchema = new Schema<IPrivacyPolicy>(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export const PrivacyPolicy = model<IPrivacyPolicy>("PrivacyPolicy", privacyPolicySchema);

import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPrivacyPolicy extends Document {
  title: string;
  content: string;
  updatedAt: Date;
  addedBy: Types.ObjectId;
}

const PrivacyPolicySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const PrivacyPolicy = mongoose.model<IPrivacyPolicy>(
  "PrivacyPolicy",
  PrivacyPolicySchema
);
