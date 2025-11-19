import { Document, Types } from "mongoose";

export interface IHomeService extends Document {
  name: string;
  price: number;
  description: string;
  image?: string;
  gender: string;       
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
