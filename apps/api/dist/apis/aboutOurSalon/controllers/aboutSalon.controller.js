"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAboutSalon = exports.updateAboutSalon = exports.getAboutSalonById = exports.getAllAboutSalon = exports.createAboutSalon = void 0;
const aboutSalon_service_1 = __importDefault(require("../services/aboutSalon.service"));
const createAboutSalon = async (req, res) => {
    try {
        const addedBy = req.user._id;
        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required!" });
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/aboutSalon/${req.file.filename}`;
        const newSalon = await aboutSalon_service_1.default.create({
            ...req.body,
            addedBy,
            image: imageUrl,
        });
        res.status(201).json({ success: true, data: newSalon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createAboutSalon = createAboutSalon;
const getAllAboutSalon = async (req, res) => {
    try {
        const salons = await aboutSalon_service_1.default.getAll();
        res.status(200).json({ success: true, data: salons });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllAboutSalon = getAllAboutSalon;
const getAboutSalonById = async (req, res) => {
    try {
        const salon = await aboutSalon_service_1.default.getById(req.params.id);
        if (!salon)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, data: salon });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAboutSalonById = getAboutSalonById;
const updateAboutSalon = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file)
            updateData.image = req.file.path;
        const updated = await aboutSalon_service_1.default.updateById(req.params.id, updateData);
        if (!updated)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateAboutSalon = updateAboutSalon;
const deleteAboutSalon = async (req, res) => {
    try {
        const deleted = await aboutSalon_service_1.default.deleteById(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, message: "Salon deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteAboutSalon = deleteAboutSalon;
