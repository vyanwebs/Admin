"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOffer = exports.updateOffer = exports.getOfferById = exports.getAllOffers = exports.createOffer = void 0;
const offer_services_1 = __importDefault(require("../services/offer.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createOffer = async (req, res) => {
    var _a;
    const customReq = req;
    try {
        const { title, discount, date, description, gender } = req.body;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!addedBy)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        if (!customReq.file)
            return res
                .status(400)
                .json({ success: false, message: "Image is required!" });
        // ✅ UNIVERSAL IMAGE URL - Har platform pe work karega
        const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
        const imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
        const newOffer = await offer_services_1.default.create({
            title,
            discount,
            date,
            description,
            gender,
            imageUrl,
            addedBy,
        });
        res.status(201).json({
            success: true,
            message: "Offer created successfully",
            data: newOffer,
        });
    }
    catch (error) {
        console.error("Error creating offer:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createOffer = createOffer;
const getAllOffers = async (req, res) => {
    try {
        const offers = await offer_services_1.default.getAll();
        res.status(200).json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllOffers = getAllOffers;
const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offer_services_1.default.getById(id);
        if (!offer)
            return res
                .status(404)
                .json({ success: false, message: "Offer not found" });
        res.status(200).json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getOfferById = getOfferById;
const updateOffer = async (req, res) => {
    const customReq = req;
    try {
        const { id } = req.params;
        const existing = await offer_services_1.default.getById(id);
        if (!existing)
            return res
                .status(404)
                .json({ success: false, message: "Offer not found" });
        let imageUrl = existing.imageUrl;
        if (customReq.file) {
            // Delete old image
            if (existing.imageUrl) {
                const oldFilePath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(existing.imageUrl));
                if (fs_1.default.existsSync(oldFilePath))
                    fs_1.default.unlinkSync(oldFilePath);
            }
            // ✅ UNIVERSAL NEW IMAGE URL
            const baseUrl = process.env.URL || `${req.protocol}://${req.get("host")}`;
            imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
        }
        const updated = await offer_services_1.default.updateById(id, {
            ...req.body,
            imageUrl,
        });
        res.status(200).json({
            success: true,
            message: "Offer updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateOffer = updateOffer;
const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🔄 Deleting offer ID:", id);
        const offer = await offer_services_1.default.getById(id);
        if (!offer) {
            console.log("❌ Offer not found with ID:", id);
            return res
                .status(404)
                .json({ success: false, message: "Offer not found" });
        }
        console.log("✅ Offer found:", offer.title);
        // Delete from database
        const deletedOffer = await offer_services_1.default.deleteById(id);
        console.log("✅ Database delete result:", deletedOffer ? "Success" : "Failed");
        if (!deletedOffer) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete offer from database",
            });
        }
        // Delete image file
        if (offer.imageUrl) {
            const imagePath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(offer.imageUrl));
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
                console.log("✅ Image deleted:", imagePath);
            }
        }
        console.log("✅ Offer deleted successfully");
        res.status(200).json({
            success: true,
            message: "Offer deleted successfully",
            deletedId: id,
        });
    }
    catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.deleteOffer = deleteOffer;
