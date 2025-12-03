"use strict";
// import mongoose, { Document, Schema, Types } from "mongoose";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// export interface ITermsCondition extends Document {
//   title: string;
//   content: string;
//   accepted: boolean;
//   updatedAt: Date;
//   addedBy: Types.ObjectId;
// }
// const TermsConditionSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     accepted: { type: Boolean, default: false },
//     updatedAt: { type: Date, default: Date.now },
//     addedBy: { type: Schema.Types.ObjectId, ref: "User" },
//   },
//   { timestamps: true }
// );
// export const TermsCondition = mongoose.model<ITermsCondition>(
//   "TermsCondition",
//   TermsConditionSchema
// );
const mongoose_1 = __importStar(require("mongoose"));
const TermsConditionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    accepted: { type: Boolean, default: false },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const TermsCondition = mongoose_1.default.model("TermsCondition", TermsConditionSchema);
exports.default = TermsCondition;
