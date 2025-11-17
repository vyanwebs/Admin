"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUploadedFile = void 0;
const dotenv_1 = require("dotenv");
const uploadedFile_1 = __importDefault(require("../models/uploadedFile"));
(0, dotenv_1.config)();
const saveUploadedFile = async (file) => {
    if (!file) {
        throw new Error("No file provided");
    }
    const newFile = new uploadedFile_1.default({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        buffer: file.buffer, // Only present if you're using memoryStorage
        url: `${process.env.URL}/uploads/images/${file.filename}`, // Adjust this based on your file server logic
    });
    const savedFile = await newFile.save();
    return savedFile._id;
};
exports.saveUploadedFile = saveUploadedFile;
