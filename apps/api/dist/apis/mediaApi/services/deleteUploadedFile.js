"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedFileById = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadedFile_1 = __importDefault(require("../models/uploadedFile")); // Adjust the path as needed
const deleteUploadedFileById = async (id) => {
    try {
        const fileRecord = await uploadedFile_1.default.findById(id);
        if (!fileRecord) {
            throw new Error("File record not found");
        }
        // Delete physical file
        if (fileRecord.path && fs_1.default.existsSync(fileRecord.path)) {
            fs_1.default.unlinkSync(fileRecord.path);
        }
        // Remove record from database
        await uploadedFile_1.default.findByIdAndDelete(id);
        console.log(`File with ID ${id} deleted successfully`);
    }
    catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};
exports.deleteUploadedFileById = deleteUploadedFileById;
