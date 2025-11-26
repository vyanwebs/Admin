"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.generateOTP = exports.checkUserEmailExists = exports.updateUserInfo = exports.getUserProfile = exports.updateProfile = exports.updateToken = exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const mongoose_1 = __importStar(require("mongoose"));
const saveFile_1 = require("../../mediaApi/services/saveFile");
const deleteUploadedFileFromReqFile_1 = require("../../mediaApi/services/deleteUploadedFileFromReqFile");
const updateUploadedFile_1 = require("../../mediaApi/services/updateUploadedFile");
const mailconfig_1 = require("../../../config/mailconfig");
const UserOTP_model_1 = require("../models/UserOTP.model");
const nanoid_1 = require("nanoid");
const register = async (req, res) => {
    try {
        const { ref } = req.query;
        const userData = req.body;
        if (!userData.appRegistrationCode) {
            return res
                .status(400)
                .json({ success: false, message: "App Registration Code is required" });
        }
        // If fullName provided, split automatically
        if (userData.fullName && (!userData.firstName || !userData.lastName)) {
            const nameParts = userData.fullName.trim().split(" ");
            userData.firstName = nameParts[0];
            userData.lastName = nameParts.slice(1).join(" ") || "";
        }
        // Ensure fullName is always set
        if (!userData.fullName && userData.firstName && userData.lastName) {
            userData.fullName = `${userData.firstName} ${userData.lastName}`;
        }
        // Check existing user
        const existingUser = await User_model_1.default.findOne({ email: userData.email });
        if (existingUser) {
            res.status(409).json({ message: "Email already in use" });
            return;
        }
        // Handle referral case
        if (ref) {
            handleReferralRegistration(req, res, userData, ref.toString());
            return;
        }
        // for production enable this
        // const storedOTP = await EmailOTP.findOne({ email: userData.email });
        // if (Number(userData.otp) === storedOTP?.otp) {
        // Normal registration
        const userDetails = await User_model_1.default.findOne({
            appRegistrationCode: userData.appRegistrationCode,
        });
        if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails._id) || !userDetails.email) {
            return res.status(401).json({
                success: false,
                message: "App Registration Code is incorrect",
            });
        }
        let imageId;
        if (req.file) {
            imageId = await (0, saveFile_1.saveUploadedFile)(req.file);
        }
        const user = new User_model_1.default({
            ...userData,
            avatar: imageId || undefined,
            subAdminEmail: userDetails.email,
            subAdminId: userDetails._id,
        });
        console.log("🚀 ~ register ~ user:", user);
        console.log(userDetails._id);
        console.log(userDetails.email);
        user.isActive = true;
        await user.save();
        await UserOTP_model_1.EmailOTP.findOneAndDelete({ email: userData.email });
        let refCode;
        do {
            refCode = "NAU" + (0, nanoid_1.nanoid)(7).toUpperCase(); //generates 8 character code
        } while (await User_model_1.default.findOne({ refLink: refCode }));
        user.refLink = refCode;
        await user.save();
        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(201).json({
            success: true,
            user: {
                ...formatUserResponse(user),
                refLink: user.refLink,
            },
            //
            token,
        });
        // } else {
        // 	return res.status(401).json({ success: false, message: "Invalid OTP" });
        // }
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed",
            error: process.env.NODE_ENV === "development" ? error : undefined,
        });
        return;
    }
};
exports.register = register;
// Helper function for referral registration
const handleReferralRegistration = async (req, res, userData, ref) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(ref)) {
        return res.status(400).json({ message: "Invalid referral ID format" });
    }
    const refUser = await User_model_1.default.findById(ref);
    if (!refUser) {
        return res.status(404).json({ message: "Referral user not found" });
    }
    const user = await User_model_1.default.create({
        ...userData,
        refLink: ref,
        admin: refUser._id,
    });
    const token = user.generateAuthToken();
    return res.status(201).json({
        user: formatUserResponse(user),
        token,
    });
};
// Format user response (remove sensitive data)
const formatUserResponse = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        if (user.subscriptionEndDate) {
            const currentDate = new Date();
            if (currentDate > user.subscriptionEndDate) {
                user.isActive = false;
                await user.save();
            }
        }
        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ user, token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
// controllers/token.controller.ts
const updateToken = async (req, res) => {
    var _a;
    try {
        const user = req.user;
        if (!user || !user._id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const foundUser = await User_model_1.default.findById(user._id).populate({
            path: "avatar",
            model: "UploadedFile",
        });
        if (!foundUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const newToken = foundUser.generateAuthToken(); // ✅ use foundUser
        res.status(200).json({
            message: "Token refreshed successfully",
            token: newToken,
            user: {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                fullName: `${foundUser.firstName} ${foundUser.lastName}`,
                avatar: ((_a = foundUser.avatar) === null || _a === void 0 ? void 0 : _a.url) || null, // ✅ populated avatar
                preferences: foundUser.preferences,
                isVerified: foundUser.isVerified,
                isActive: foundUser.isActive,
                subscriptionType: foundUser.subscriptionType,
                subscriptionStatus: foundUser.subscriptionStatus,
                bio: foundUser.bio,
                dateOfBirth: foundUser.dateOfBirth,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt,
                address: foundUser.address,
            },
        });
    }
    catch (error) {
        console.error("Token refresh error:", error);
        res.status(500).json({ message: "Token refresh failed", error });
    }
};
exports.updateToken = updateToken;
/////////
const updateProfile = async (req, res) => {
    var _a, _b, _c, _d;
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized user" });
            return;
        }
        let avatar;
        const existingAvatarId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.avatar) || ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.avatar) === null || _d === void 0 ? void 0 : _d._id);
        if (existingAvatarId) {
            const avatarId = new mongoose_1.Types.ObjectId(existingAvatarId);
            avatar = await (0, updateUploadedFile_1.updateUploadedFile)(avatarId, req.file);
        }
        else {
            avatar = await (0, saveFile_1.saveUploadedFile)(req.file);
        }
        await User_model_1.default.findByIdAndUpdate(userId, { avatar: avatar._id });
        res.status(200).json({ url: avatar.url });
    }
    catch (err) {
        if (req.file) {
            (0, deleteUploadedFileFromReqFile_1.deleteUploadedFileFromReqFile)(req.file);
        }
        console.error("Error updating profile:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};
exports.updateProfile = updateProfile;
const getUserProfile = async (req, res) => {
    var _a;
    try {
        const user = req.user;
        if (!user || !user._id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const foundUser = await User_model_1.default.findById(user._id).populate({
            path: "avatar",
            model: "UploadedFile",
        });
        if (!foundUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                fullName: `${foundUser.firstName} ${foundUser.lastName}`,
                avatar: ((_a = foundUser.avatar) === null || _a === void 0 ? void 0 : _a.url) || null,
                phone: foundUser.phone || null,
                bio: foundUser.bio || null,
                gender: foundUser.gender || null,
                dateOfBirth: foundUser.dateOfBirth || null,
                preferences: foundUser.preferences,
                isVerified: foundUser.isVerified,
                isActive: foundUser.isActive,
                subscriptionType: foundUser.subscriptionType,
                subscriptionStatus: foundUser.subscriptionStatus,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt,
                address: foundUser.address,
            },
        });
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Failed to fetch user profile", error });
    }
};
exports.getUserProfile = getUserProfile;
// export const updateUserInfo = async (
// 	req: Request,
// 	res: Response
// ): Promise<void> => {
// 	try {
// 		const userId = (req as any).user?._id;
// 		if (!userId) {
// 			res.status(401).json({ message: "Unauthorized" });
// 			return;
// 		}
// 		// Validate incoming data using Zod
// 		const parseResult = req.body;
// 		if (!parseResult.success) {
// 			res
// 				.status(400)
// 				.json({ message: "Invalid data", errors: parseResult.error.format() });
// 			return;
// 		}
// 		// const updates = parseResult.data;
// 		// const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
// 		// 	new: true,
// 		// 	runValidators: true,
// 		// }).populate("avatar");
// 		// if (!updatedUser) {
// 		// 	res.status(404).json({ message: "User not found" });
// 		// 	return;
// 		// }
// 		const user = await User.findById(userId);
// 		if (!user) {
// 			res.status(404).json({ message: "User not found" });
// 			return;
// 		}
// 		if (req.file) {
// 			if (user.avatar) {
// 				// Update existing avatar file
// 				await updateUploadedFile(user.avatar as Types.ObjectId, req.file);
// 			} else {
// 				// Save new avatar file
// 				const newFile = await saveUploadedFile(req.file);
// 				user.avatar = (newFile as any)._id;
// 			}
// 		}
// 		Object.assign(user, parseResult.data);
// 		await user.save();
// 		// Populate avatar URL
// 		await user.populate("avatar", "url");
// 		res.status(200).json({
// 			message: "Profile updated successfully",
// 			user,
// 		});
// 	} catch (error: any) {
// 		console.error("Update user info error:", error);
// 		res
// 			.status(500)
// 			.json({ message: "Something went wrong", error: error.message });
// 	}
// };
const updateUserInfo = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // ALWAYS validate using zod
        // const parseResult = updateUserSchema.safeParse(req.body);
        const parseResult = req.body;
        console.log("parseResult", parseResult);
        // if (!parseResult.success) {
        // 	res.status(400).json({
        // 		message: "Invalid data",
        // 		errors: parseResult.error.format(),
        // 	});
        // 	return;
        // }
        const user = await User_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Handle avatar
        if (req.file) {
            if (user.avatar) {
                await (0, updateUploadedFile_1.updateUploadedFile)(user.avatar, req.file);
            }
            else {
                const newFile = await (0, saveFile_1.saveUploadedFile)(req.file);
                user.avatar = newFile._id;
            }
        }
        // Merge validated fields
        Object.assign(user, req.body);
        await user.save();
        await user.populate("avatar", "url");
        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    }
    catch (error) {
        console.error("Update user info error:", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};
exports.updateUserInfo = updateUserInfo;
const checkUserEmailExists = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== "string") {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const exists = await User_model_1.default.exists({ email });
        res.status(200).json({ exists: !!exists });
        return;
    }
    catch (error) {
        console.error("Email check error:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.checkUserEmailExists = checkUserEmailExists;
// generate otp for email
const generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = await (0, mailconfig_1.sendOTP)(email);
        if (otp) {
            return res
                .status(200)
                .json({ success: true, message: "OTP Generated Successfully" });
        }
        await UserOTP_model_1.EmailOTP.findOneAndUpdate({ email }, { otp }, { new: true, upsert: true });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: error.message });
    }
};
exports.generateOTP = generateOTP;
const userLogout = async (req, res) => {
    try {
        return res.cookie("token", "").status(200).json({
            success: true,
            message: "User has been logout successfully!",
            data: null,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
exports.userLogout = userLogout;
