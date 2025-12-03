// import mongoose, { Document, Schema } from "mongoose";

// export interface IAboutUs extends Document {
//   title: string;
//   content: string;
//   updatedAt: Date;
// }

// const AboutUsSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   updatedAt: { type: Date, default: Date.now },
//   addedBy: {type:Schema.Types.ObjectId, ref: "User", required: true},
// });

// export const AboutUs = mongoose.model<IAboutUs>("AboutUs", AboutUsSchema);

// import mongoose, { Document, Schema, Types } from "mongoose";

// export interface IAboutUs extends Document {
//   title: string;
//   content: string;
//   addedBy: Types.ObjectId;
// }

// const AboutUsSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ⭐ SAME AS OFFER
//   },
//   { timestamps: true }
// );

// export const AboutUs = mongoose.model<IAboutUs>("AboutUs", AboutUsSchema);
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAboutUs extends Document {
  title: string;
  content: string;
  addedBy: Types.ObjectId;
}

const AboutUsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const AboutUs = mongoose.model<IAboutUs>("AboutUs", AboutUsSchema);

export default AboutUs;
