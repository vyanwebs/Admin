"use strict";
// import { Request, Response } from "express";
// import CertificateService from "../services/certificate.service";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCertificate = exports.deleteCertificate = exports.getAllCertificates = exports.uploadCertificate = void 0;
const certificate_service_1 = __importDefault(require("../services/certificate.service"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const uploadCertificate = async (req, res) => {
    try {
        const { title } = req.body;
        const addedBy = req.user._id;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Certificate image is required!",
            });
        }
        const filename = path_1.default.basename(req.file.path);
        const imageUrl = `${process.env.URL}/uploads/images/${filename}`;
        const certificate = await certificate_service_1.default.create(title, imageUrl, addedBy);
        res.status(201).json({ success: true, data: certificate });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.uploadCertificate = uploadCertificate;
// export const getAllCertificates = async (req: Request, res: Response) => {
// 	try {
// 		// OPTION 1 → Return ALL certificates for both Admin & User
// 		const certificates = await CertificateService.getAll();
// 		res.status(200).json({ success: true, data: certificates });
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			error: (error as Error).message,
// 		});
// 	}
// };
const getAllCertificates = async (req, res) => {
    try {
        let certificates;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            certificates = await certificate_service_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: certificates });
        }
        const addedBy = req.user.subAdminId;
        certificates = await certificate_service_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: certificates });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllCertificates = getAllCertificates;
const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await certificate_service_1.default.deleteById(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.deleteCertificate = deleteCertificate;
const updateCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await certificate_service_1.default.getById(id);
        if (!certificate)
            return res.status(404).json({ message: "Certificate not found" });
        if (req.body.title)
            certificate.title = req.body.title;
        if (req.file) {
            certificate.imageUrl = `${process.env.URL}/uploads/images/${req.file.filename}`;
        }
        await certificate.save();
        res.status(200).json({ success: true, data: certificate });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateCertificate = updateCertificate;
