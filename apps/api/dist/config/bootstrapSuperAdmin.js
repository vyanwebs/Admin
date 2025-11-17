"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuperAdminIfNotExists = void 0;
const User_model_1 = __importDefault(require("../apis/userApi/models/User.model"));
const createSuperAdminIfNotExists = async () => {
    const superAdminEmail = "admin@example.com";
    const existing = await User_model_1.default.findOne({ email: superAdminEmail, role: "superadmin" });
    // console.log("..........",existing)
    if (!existing) {
        const password = "Admin@123";
        await User_model_1.default.create({
            firstName: "Super",
            lastName: "Admin",
            email: superAdminEmail,
            password,
            role: "superadmin",
            isVerified: true
        });
        console.log("✅ Superadmin created");
    }
    else {
        console.log("🟢 Superadmin already exists");
    }
};
exports.createSuperAdminIfNotExists = createSuperAdminIfNotExists;
