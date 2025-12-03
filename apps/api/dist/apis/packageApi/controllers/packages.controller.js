"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackage = exports.updatePackage = exports.getPackageById = exports.getAllPackages = exports.createPackage = void 0;
const packages_model_1 = __importDefault(require("../models/packages.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPackage = async (req, res) => {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            return res.status(400).json({
                success: false,
                message: "User authentication failed",
            });
        }
        const addedBy = new mongoose_1.default.Types.ObjectId(user._id);
        const imageUrl = req.file
            ? `${process.env.URL}/uploads/images/${req.file.filename}`
            : "";
        const newPackage = new packages_model_1.default({
            title: req.body.title,
            price: req.body.price,
            services: req.body.services,
            about: req.body.about,
            discount: req.body.discount,
            review: req.body.review,
            rating: req.body.rating,
            gender: req.body.gender,
            image: imageUrl,
            addedBy,
        });
        const saved = await newPackage.save();
        res.status(201).json({ success: true, data: saved });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.createPackage = createPackage;
// export const getAllPackages = async (req: Request, res: Response) => {
//   try {
//     const packages = await Package.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: packages });
//   } catch (err: any) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
const getAllPackages = async (req, res) => {
    try {
        let packages;
        const subAdminId = req.user.id; // admin or the main user id
        // If admin → get packages added by this admin
        if (req.user.role === "admin") {
            packages = await packages_model_1.default.find({ addedBy: subAdminId }).sort({
                createdAt: -1,
            });
            return res.status(200).json({ success: true, data: packages });
        }
        // If subadmin → get packages using its mapped subAdminId
        const addedBy = req.user.subAdminId;
        packages = await packages_model_1.default.find({
            addedBy: new mongoose_1.default.Types.ObjectId(addedBy),
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: packages });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.getAllPackages = getAllPackages;
const getPackageById = async (req, res) => {
    try {
        const pkg = await packages_model_1.default.findById(req.params.id);
        if (!pkg)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res.status(200).json({ success: true, data: pkg });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.getPackageById = getPackageById;
const updatePackage = async (req, res) => {
    try {
        const imageUrl = req.file
            ? `${process.env.URL}/uploads/images/${req.file.filename}`
            : req.body.image;
        const updated = await packages_model_1.default.findByIdAndUpdate(req.params.id, { ...req.body, image: imageUrl }, { new: true });
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.updatePackage = updatePackage;
const deletePackage = async (req, res) => {
    try {
        const deleted = await packages_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res
                .status(404)
                .json({ success: false, message: "Package not found" });
        res
            .status(200)
            .json({ success: true, message: "Package deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.deletePackage = deletePackage;
