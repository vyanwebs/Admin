"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUploadedFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadedFile_1 = __importDefault(require("../models/uploadedFile")); // Adjust path
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const updateUploadedFile = async (id, file) => {
    try {
        const existing = await uploadedFile_1.default.findById(id);
        if (!existing) {
            throw new Error("File record not found");
        }
        // Delete old file from disk
        if (existing.path && fs_1.default.existsSync(existing.path)) {
            fs_1.default.unlinkSync(existing.path);
        }
        // Update document fields
        existing.fieldname = file.fieldname;
        existing.originalname = file.originalname;
        existing.encoding = file.encoding;
        existing.mimetype = file.mimetype;
        existing.size = file.size;
        existing.destination = file.destination;
        existing.filename = file.filename;
        existing.path = file.path;
        existing.buffer = file.buffer;
        existing.url = `${process.env.URL}/uploads/images/${file.filename}`; // If you're serving from `/uploads`
        await existing.save();
        return existing;
    }
    catch (err) {
        console.error("Update file error:", err);
        throw err;
    }
};
exports.updateUploadedFile = updateUploadedFile;
