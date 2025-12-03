"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHomeService = exports.updateHomeService = exports.getHomeServiceById = exports.getHomeServices = exports.createHomeService = void 0;
const homeService_services_1 = __importDefault(require("../services/homeService.services"));
const mongoose_1 = __importDefault(require("mongoose"));
const createHomeService = async (req, res) => {
    try {
        const addedBy = req.user._id;
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "Image is required!" });
        }
        // ✅ FIX: Save correct URL with /uploads/images/
        const imageUrl = `${process.env.URL}/uploads/images/${req.file.filename}`;
        const newService = await homeService_services_1.default.create({
            ...req.body,
            addedBy,
            image: imageUrl,
        });
        res.status(201).json({ success: true, data: newService });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createHomeService = createHomeService;
// export const getHomeServices = async (req: Request, res: Response) => {
// 	try {
// 		const services = await HomeServiceService.getAll();
// 		res.status(200).json({ success: true, data: services });
// 	} catch (error: any) {
// 		res.status(500).json({ success: false, error: error.message });
// 	}
// };
const getHomeServices = async (req, res) => {
    try {
        let services;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            services = await homeService_services_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: services });
        }
        const addedBy = req.user.subAdminId;
        services = await homeService_services_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHomeServices = getHomeServices;
const getHomeServiceById = async (req, res) => {
    try {
        const service = await homeService_services_1.default.getById(req.params.id);
        if (!service) {
            return res
                .status(404)
                .json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHomeServiceById = getHomeServiceById;
const updateHomeService = async (req, res) => {
    try {
        const updateData = { ...req.body };
        // ✅ FIX: If a new image is uploaded, build correct URL
        if (req.file) {
            updateData.image = `${process.env.URL}/uploads/images/${req.file.filename}`;
        }
        const updated = await homeService_services_1.default.updateById(req.params.id, updateData);
        if (!updated) {
            return res
                .status(404)
                .json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateHomeService = updateHomeService;
const deleteHomeService = async (req, res) => {
    try {
        const deleted = await homeService_services_1.default.deleteById(req.params.id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Service not found" });
        }
        res
            .status(200)
            .json({ success: true, message: "Service deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteHomeService = deleteHomeService;
