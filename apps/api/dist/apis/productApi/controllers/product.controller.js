"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_services_1 = __importDefault(require("../services/product.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
//  Create Product
const createProduct = async (req, res) => {
    var _a, _b, _c, _d, _e;
    const customReq = req;
    try {
        const { name, price, offer, rating, tag, description, reviews, gender, } = req.body;
        //  Convert addedBy to ObjectId if user exists
        const addedBy = ((_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id)
            ? new mongoose_1.default.Types.ObjectId(customReq.user._id)
            : undefined;
        if (!((_c = (_b = customReq.files) === null || _b === void 0 ? void 0 : _b.image) === null || _c === void 0 ? void 0 : _c[0])) {
            return res
                .status(400)
                .json({ success: false, message: "Main image is required!" });
        }
        const image = `${process.env.URL}/uploads/images/${customReq.files.image[0].filename}`;
        const icons = ((_e = (_d = customReq.files) === null || _d === void 0 ? void 0 : _d.icons) === null || _e === void 0 ? void 0 : _e.map((file) => `${process.env.URL}/uploads/images/${file.filename}`)) || [];
        const product = await product_services_1.default.create({
            name,
            price,
            offer,
            rating,
            tag,
            description,
            image,
            icons,
            reviews,
            gender,
            addedBy, //  Properly typed
        });
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createProduct = createProduct;
//  Get All Products
// export const getAllProducts = async (req: Request, res: Response) => {
// 	try {
// 		const products = await ProductService.getAll();
// 		res.status(200).json({ success: true, data: products });
// 	} catch (error) {
// 		res.status(500).json({ success: false, error: (error as Error).message });
// 	}
// };
const getAllProducts = async (req, res) => {
    try {
        let products;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            products = await product_services_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: products });
        }
        const addedBy = req.user.subAdminId;
        products = await product_services_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// Get Product by ID
// export const getProductById = async (req: Request, res: Response) => {
// 	try {
// 		const product = await ProductService.getById(req.params.id);
// 		if (!product)
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Product not found" });
// 		res.status(200).json({ success: true, data: product });
// 	} catch (error) {
// 		res.status(500).json({ success: false, error: (error as Error).message });
// 	}
// };
const getProductById = async (req, res) => {
    try {
        let product;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            product = await product_services_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: product });
        }
        const addedBy = req.user.subAdminId;
        product = await product_services_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProductById = getProductById;
//  Update Product
const updateProduct = async (req, res) => {
    const customReq = req;
    try {
        const { id } = req.params;
        const existing = await product_services_1.default.getById(id);
        if (!existing)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        let image = existing.image;
        if (customReq.file) {
            const oldPath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(existing.image));
            if (fs_1.default.existsSync(oldPath))
                fs_1.default.unlinkSync(oldPath);
            image = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
        }
        //  Destructure gender from body and keep existing if not provided
        const { gender, ...rest } = req.body;
        const updated = await product_services_1.default.updateById(id, {
            ...rest,
            image,
            gender: gender !== null && gender !== void 0 ? gender : existing.gender,
        });
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateProduct = updateProduct;
//  Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_services_1.default.getById(id);
        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        //  Delete main image file
        const imgPath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(product.image));
        if (fs_1.default.existsSync(imgPath))
            fs_1.default.unlinkSync(imgPath);
        await product_services_1.default.deleteById(id);
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
