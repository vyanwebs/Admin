"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadedFileById = void 0;
const uploadedFile_1 = __importDefault(require("../models/uploadedFile")); // adjust path as needed
const getUploadedFileById = async (id) => {
    try {
        const file = await uploadedFile_1.default.findById(id);
        if (!file) {
            throw new Error("File not found");
        }
        return file;
    }
    catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
};
exports.getUploadedFileById = getUploadedFileById;
