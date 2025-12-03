"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductPackage = exports.updateProductPackage = exports.getProductPackageById = exports.getProductPackages = exports.createProductPackage = void 0;
const productPackage_services_1 = __importDefault(require("../services/productPackage.services"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProductPackage = async (req, res) => {
    try {
        const addedBy = req.user._id;
        const file = req.file;
        const { name, price, review, description, items, offers, usage, gender } = req.body;
        let imageUrl = "";
        if (file) {
            const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
            imageUrl = `${process.env.URL}/uploads/images/${file.filename}`;
        }
        const newPackage = await productPackage_services_1.default.create({
            name,
            price: Number(price),
            review,
            description,
            offers,
            usage,
            image: imageUrl,
            gender,
            items: Array.isArray(items) ? items : [items],
            addedBy,
        });
        res.status(201).json({
            success: true,
            message: "Product package created successfully",
            data: newPackage,
        });
    }
    catch (error) {
        console.error("Create package error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createProductPackage = createProductPackage;
// ✅ Get all packages for everyone
// export const getProductPackages = async (req: Request, res: Response) => {
// 	try {
// 		const packages = await ProductPackageService.getAll();
// 		res.status(200).json({ success: true, data: packages });
// 	} catch (error) {
// 		res.status(500).json({ success: false, error: (error as Error).message });
// 	}
// };
const getProductPackages = async (req, res) => {
    try {
        let packages;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            packages = await productPackage_services_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: packages });
        }
        const addedBy = req.user.subAdminId;
        packages = await productPackage_services_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: packages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProductPackages = getProductPackages;
const getProductPackageById = async (req, res) => {
    try {
        const pkg = await productPackage_services_1.default.getById(req.params.id);
        if (!pkg)
            return res
                .status(404)
                .json({ success: false, message: "Product package not found" });
        res.status(200).json({ success: true, data: pkg });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProductPackageById = getProductPackageById;
const updateProductPackage = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const updateData = { ...req.body };
        if (file) {
            const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
            updateData.image = `${process.env.URL}/uploads/images/${file.filename}`;
        }
        if (req.body.items) {
            updateData.items =
                typeof req.body.items === "string" ? [req.body.items] : req.body.items;
        }
        const updated = await productPackage_services_1.default.updateById(id, updateData);
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: "Product package not found" });
        res.status(200).json({
            success: true,
            message: "Product package updated successfully",
            data: updated,
        });
    }
    catch (error) {
        console.error("Update package error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateProductPackage = updateProductPackage;
const deleteProductPackage = async (req, res) => {
    try {
        const deleted = await productPackage_services_1.default.deleteById(req.params.id);
        if (!deleted)
            return res
                .status(404)
                .json({ success: false, message: "Product package not found" });
        res
            .status(200)
            .json({ success: true, message: "Product package deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteProductPackage = deleteProductPackage;
