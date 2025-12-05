"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.demoteUser = exports.promoteUser = exports.enableDisableUser = exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const user_types_1 = require("../types/user.types");
const User_model_1 = __importDefault(require("../models/User.model"));
const saveFile_1 = require("../../mediaApi/services/saveFile");
const nanoid_1 = require("nanoid");
const dayjs_1 = __importDefault(require("dayjs"));
// =======================================================
// CREATE USER (SUB ADMIN)
// =======================================================
const createUser = async (req, res) => {
    try {
        const { fullName, password, phone, address, status, subscriptionPeriod, customDate, noOfChairs, email, } = req.body;
        // Upload Image
        let imageId;
        if (req.file) {
            imageId = await (0, saveFile_1.saveUploadedFile)(req.file);
        }
        // Auto-generated APK Name
        const count = await User_model_1.default.countDocuments();
        const appName = `app${count + 1}.apk`;
        // Auto Registration Code
        const appRegistrationCode = `NAU${(0, nanoid_1.nanoid)(7).toUpperCase()}`;
        // Default 0 chairs
        const chairs = Number(noOfChairs) || 0;
        // Subscription Dates
        const subscriptionStartDate = new Date();
        let subscriptionEndDate = undefined;
        if (subscriptionPeriod === "halfyearly") {
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate)
                .add(6, "month")
                .toDate();
        }
        else if (subscriptionPeriod === "yearly") {
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate)
                .add(1, "year")
                .toDate();
        }
        else if (subscriptionPeriod === "custom" && customDate) {
            subscriptionEndDate = (0, dayjs_1.default)(customDate).toDate();
        }
        // Create User
        const newUser = await user_service_1.default.createUser({
            email,
            fullName,
            password,
            phone,
            address,
            isActive: status === "active",
            subscriptionPeriod,
            subscriptionStartDate,
            subscriptionEndDate,
            customDate,
            avatar: imageId || undefined,
            noOfChairs: chairs,
            role: user_types_1.UserRole.ADMIN,
            appName,
            appRegistrationCode,
        });
        res.status(201).json({ message: "User created", user: newUser });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation failed",
                errors: error.errors,
            });
            return;
        }
        res.status(500).json({
            message: "Registration failed",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};
exports.createUser = createUser;
// =======================================================
// GET USER BY ID
// =======================================================
const getUserById = async (req, res) => {
    try {
        const user = await user_service_1.default.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUserById = getUserById;
// =======================================================
// GET USER BY EMAIL
// =======================================================
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (typeof email !== "string") {
            res.status(400).json({ error: "Invalid email" });
            return;
        }
        const user = await user_service_1.default.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUserByEmail = getUserByEmail;
// =======================================================
// UPDATE USER
// =======================================================
const updateUser = async (req, res) => {
    var _a;
    try {
        const user = await User_model_1.default.find({
            _id: req.params.id,
            admin: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        if (!user) {
            res.status(401).json({ error: "Not authorized" });
            return;
        }
        const updated = await user_service_1.default.updateUser(req.params.id, req.body, req.file);
        if (!updated) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ message: "User updated", user: updated });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateUser = updateUser;
// =======================================================
// DELETE USER
// =======================================================
const deleteUser = async (req, res) => {
    try {
        await user_service_1.default.deleteUser(req.params.id);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteUser = deleteUser;
// =======================================================
// ENABLE / DISABLE USER
// =======================================================
const enableDisableUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User_model_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        const updatedUser = await User_model_1.default.findByIdAndUpdate(userId, { $set: { isActive: !user.isActive } }, // ✔ only update this field
        { new: true, runValidators: false } // ✔ no full validation
        );
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
exports.enableDisableUser = enableDisableUser;
// =======================================================
// PROMOTE USER
// =======================================================
const promoteUser = async (req, res) => {
    var _a;
    try {
        const user = await user_service_1.default.promoteToAdmin(req.params.id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        res.status(200).json({ message: "User promoted to admin", user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.promoteUser = promoteUser;
// =======================================================
// DEMOTE USER
// =======================================================
const demoteUser = async (req, res) => {
    try {
        const user = await user_service_1.default.demoteToUser(req.params.id);
        res.status(200).json({ message: "User demoted to user", user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.demoteUser = demoteUser;
// =======================================================
// GET ALL USERS
// =======================================================
const getAllUser = async (req, res) => {
    var _a, _b;
    try {
        let users;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role.toLowerCase()) === "superadmin") {
            users = await user_service_1.default.getAllUsers();
        }
        else {
            users = await user_service_1.default.getAllUsersForAdmin((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        }
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllUser = getAllUser;
