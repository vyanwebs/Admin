// import { Types, Document } from "mongoose";
// export interface ICertificate extends Document {
//   title: string;
//   imageUrl: string; // path to uploaded certificate image
//   addedBy: Types.ObjectId; // admin who uploaded
//   createdAt: Date;
//   updatedAt: Date;
  
// }

import { Types, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  imageUrl: string;
  addedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
