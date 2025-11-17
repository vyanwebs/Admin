"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedFileFromReqFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadedFile_1 = __importDefault(require("../models/uploadedFile"));
const deleteUploadedFileFromReqFile = async (file) => {
    try {
        if (!file) {
            throw new Error("No file provided for deletion");
        }
        // Find file record in DB
        const fileRecord = await uploadedFile_1.default.findOne({ filename: file.filename });
        if (!fileRecord) {
            console.warn(`No DB record found for filename: ${file.filename}`);
        }
        else {
            await uploadedFile_1.default.findByIdAndDelete(fileRecord._id);
            console.log(`DB record deleted for file: ${file.filename}`);
        }
        // Delete file from disk
        if (file.path && fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
            console.log(`Physical file deleted: ${file.path}`);
        }
        else {
            console.warn(`Physical file not found: ${file.path}`);
        }
    }
    catch (error) {
        console.error("Error in deleteUploadedFileFromReqFile:", error);
        throw error;
    }
};
exports.deleteUploadedFileFromReqFile = deleteUploadedFileFromReqFile;
