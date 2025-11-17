"use strict";
// import { Schema, model, Document } from "mongoose";
// import { ICertificate } from "../types/certificate.types";
// const certificateSchema = new Schema<ICertificate>(
//   {
//     title: { type: String, required: true },
//     imageUrl: { type: String, required: true }, // Multer saves the file, we save path
//     addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );
Object.defineProperty(exports, "__esModule", { value: true });
// export default model<ICertificate>("Certificate", certificateSchema);
const mongoose_1 = require("mongoose");
const certificateSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Certificate", certificateSchema);
