"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOurService = exports.updateOurService = exports.getOurServiceById = exports.getAllOurServices = exports.createOurService = void 0;
const ourservice_service_1 = __importDefault(require("../services/ourservice.service"));
const mongoose_1 = __importDefault(require("mongoose"));
// CREATE
const createOurService = async (req, res) => {
    var _a;
    const customReq = req;
    try {
        const { serviceName, price, title, highlights, extra, estimatedTime, category, gender, } = req.body;
        if (!((_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!customReq.file) {
            return res
                .status(400)
                .json({ success: false, message: "Service image is required!" });
        }
        const imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
        const newService = await ourservice_service_1.default.create({
            serviceName,
            price,
            title,
            highlights,
            extra,
            estimatedTime,
            category,
            gender,
            imageUrl,
            addedBy: customReq.user._id,
        });
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createOurService = createOurService;
// GET ALL
// export const getAllOurServices = async (req: Request, res: Response) => {
//   const customReq = req as any;
//   try {
//     let services;
//     // Admin / Superadmin → sab services
//     // Normal user → sab services bhi access kar sakta hai
//     services = await OurServiceService.getAll();
//     return res.status(200).json({ success: true, data: services });
//   } catch (error: unknown) {
//     res.status(500).json({ success: false, error: (error as Error).message });
//   }
// };
const getAllOurServices = async (req, res) => {
    try {
        let services;
        const subAdminId = req.user.id;
        if (req.user.role === "admin") {
            services = await ourservice_service_1.default.getAll(subAdminId);
            res.status(200).json({ success: true, data: services });
        }
        const addedBy = req.user.subAdminId;
        services = await ourservice_service_1.default.getAll(new mongoose_1.default.Types.ObjectId(addedBy));
        res.status(200).json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllOurServices = getAllOurServices;
// GET BY ID
const getOurServiceById = async (req, res) => {
    try {
        const service = await ourservice_service_1.default.getById(req.params.id);
        if (!service) {
            return res
                .status(404)
                .json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getOurServiceById = getOurServiceById;
// UPDATE
const updateOurService = async (req, res) => {
    const customReq = req;
    try {
        const data = req.body;
        if (customReq.file) {
            data.imageUrl = `${process.env.URL}/uploads/images/${customReq.file.filename}`;
        }
        const updatedService = await ourservice_service_1.default.updateById(req.params.id, data);
        if (!updatedService) {
            return res
                .status(404)
                .json({ success: false, message: "Service not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            message: "Service updated successfully",
            data: updatedService,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateOurService = updateOurService;
// DELETE
const deleteOurService = async (req, res) => {
    try {
        const deleted = await ourservice_service_1.default.deleteById(req.params.id);
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
exports.deleteOurService = deleteOurService;
