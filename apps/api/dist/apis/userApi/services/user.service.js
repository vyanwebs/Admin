"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_model_1 = __importDefault(require("../models/User.model"));
const chairs_model_1 = require("../../salonChairsApi/model/chairs.model");
const deleteUploadedFile_1 = require("../../mediaApi/services/deleteUploadedFile");
const saveFile_1 = require("../../mediaApi/services/saveFile");
const updateUploadedFile_1 = require("../../mediaApi/services/updateUploadedFile");
const user_types_1 = require("../types/user.types");
const dayjs_1 = __importDefault(require("dayjs"));
class UserService {
    // helper used by controller to save a file and return id (adapts existing saveUploadedFile)
    async saveFileFromController(file) {
        const saved = await (0, saveFile_1.saveUploadedFile)(file);
        // saveUploadedFile might return the doc or id; try to standardize
        if (saved && saved._id)
            return saved._id;
        if (saved && saved.id)
            return saved.id;
        return saved;
    }
    async getUserCount() {
        return User_model_1.default.countDocuments();
    }
    async createUser(createUserDto) {
        // compute subscription dates
        const subscriptionStartDate = new Date();
        let subscriptionEndDate = subscriptionStartDate;
        const period = createUserDto.subscriptionPeriod || "halfyearly";
        if (period === "halfyearly") {
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate)
                .add(6, "month")
                .toDate();
        }
        else if (period === "yearly") {
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate)
                .add(1, "year")
                .toDate();
        }
        else if (period === "custom" && createUserDto.customDate) {
            const parsed = (0, dayjs_1.default)(createUserDto.customDate);
            if (!parsed.isValid())
                throw new Error("Invalid customDate for subscription");
            subscriptionEndDate = parsed.toDate();
        }
        const user = new User_model_1.default({
            ...createUserDto,
            role: createUserDto.role || user_types_1.UserRole.ADMIN,
            subscriptionStartDate,
            subscriptionEndDate,
            subscriptionStatus: "active",
        });
        await user.save();
        // create chairs
        const chairs = [];
        for (let i = 1; i <= (createUserDto.noOfChairs || 0); i++) {
            chairs.push({
                chairNumber: i,
                subAdminId: user._id,
                subAdminEmail: user.email,
                isChairAvailable: true,
            });
        }
        let chairData;
        if (chairs.length) {
            chairData = await chairs_model_1.ChairsModel.insertMany(chairs);
        }
        await user.populate("avatar", "url");
        return { user, chairs: chairData };
    }
    async getUserById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid user id");
        return User_model_1.default.findById(id).populate("avatar", "url");
    }
    async getUserByEmail(email) {
        return User_model_1.default.findOne({ email })
            .select("+password")
            .populate("avatar", "url");
    }
    async updateUser(id, updateData, file) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid user id");
        const user = await User_model_1.default.findById(id);
        if (!user)
            throw new Error("User not found");
        if (file) {
            // If user already has an avatar stored as UploadedFile id -> update it
            if (user.avatar) {
                await (0, updateUploadedFile_1.updateUploadedFile)(user.avatar, file);
            }
            else {
                const newFile = await (0, saveFile_1.saveUploadedFile)(file);
                if (newFile._id)
                    user.avatar = newFile._id;
                else if (newFile.id)
                    user.avatar = newFile.id;
                else
                    user.avatar = newFile;
            }
        }
        // If updating noOfChairs -> adjust ChairsModel
        if (typeof updateData.noOfChairs !== "undefined") {
            const newCount = Number(updateData.noOfChairs);
            const existingChairs = await chairs_model_1.ChairsModel.find({ subAdminId: user._id });
            const currentCount = existingChairs.length;
            if (newCount > currentCount) {
                const newChairs = [];
                for (let i = currentCount + 1; i <= newCount; i++) {
                    newChairs.push({
                        chairNumber: i,
                        subAdminId: user._id,
                        subAdminEmail: user.email,
                        isChairAvailable: true,
                    });
                }
                await chairs_model_1.ChairsModel.insertMany(newChairs);
            }
            else if (newCount < currentCount) {
                await chairs_model_1.ChairsModel.deleteMany({
                    subAdminId: user._id,
                    chairNumber: { $gt: newCount },
                });
            }
        }
        // apply updates (avoid overwriting restricted fields if needed)
        Object.assign(user, updateData);
        await user.save();
        await user.populate("avatar", "url");
        return user;
    }
    async deleteUser(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid user id");
        const user = await User_model_1.default.findById(id);
        if (!user)
            throw new Error("User not found");
        if (user.avatar) {
            try {
                await (0, deleteUploadedFile_1.deleteUploadedFileById)(user.avatar.toString());
            }
            catch (err) {
                // log and continue
                console.error("Failed to delete avatar file:", err);
            }
        }
        await User_model_1.default.findByIdAndDelete(id);
        // optional: delete chairs for this subadmin
        await chairs_model_1.ChairsModel.deleteMany({ subAdminId: user._id });
    }
    async promoteToAdmin(id, adminId) {
        return User_model_1.default.findByIdAndUpdate(id, { role: user_types_1.UserRole.ADMIN, admin: adminId }, { new: true }).populate("avatar", "url");
    }
    async demoteToUser(id) {
        return User_model_1.default.findByIdAndUpdate(id, { role: user_types_1.UserRole.USER }, { new: true }).populate("avatar", "url");
    }
    async getAllUsers() {
        return User_model_1.default.find({ role: { $nin: ["superadmin"] } }).populate("avatar", "url");
    }
    async getAllUsersForAdmin(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid ObjectId");
        return User_model_1.default.find({ admin: id, role: { $nin: ["superadmin"] } }).populate("avatar", "url");
    }
}
exports.default = new UserService();
