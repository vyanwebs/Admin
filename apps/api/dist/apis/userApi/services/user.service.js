"use strict";
// <<<<<<< HEAD
// // import { ChairsModel } from "../../salonCharisApi/model/chairs.model";
// // import { createUser } from "../controllers/user.controller";
// // import { CreateUserDto } from "../dtos/create-user.dto";
// // import User from "../models/User.model";
// // import type { IUser } from "../types/user.types";
// // import { UserRole } from "../types/user.types";
// // import { Types } from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // class UserService {
// // 	async createUser(createUserDto: {
// // 		fullName: string;
// // 		email: string;
// // 		password: string;
// // 		phone: string;
// // 		address: string;
// // 		isActive: boolean;
// // 		subscriptionPeriod: string;
// // 		expireDate?: Date;
// // 		avatar?: string;
// // 		admin?: Types.ObjectId;
// // 		noOfChairs?: number;
// // 		role?: UserRole;
// // 		registrationCode?: string;
// // 		appName?: string;
// // 		appRegistrationCode?: string;
// // 	}) 
// // 	 {
// // 	 	const now = new Date();
// // 	     let endDate = new Date(now);
// // 		if(createUserDto.subscriptionPeriod === "halfyearly"){
// // 			endDate.setMonth(endDate.getMonth() + 6);
// // 		}
// // 		else if(createUserDto.subscriptionPeriod === "yearly"){
// // 			endDate.setFullYear(endDate.getFullYear()+1);
// // 		}
// // 		else if(createUserDto.subscriptionPeriod === "custom" && createUserDto.expireDate){
// // 			 endDate = new Date(createUserDto.expireDate);
// // 		}
// // 	}
// // 		const user = new User({
// // 			...createUserDto,
// // 			role : UserRole.ADMIN,
// // 			    subscriptionStartDate: now,
// // 				    subscriptionEndDate: endDate,
// // 			role: UserRole.ADMIN, // default role
// // 		});
// // 		await user.save();
// // 		const chairs = [];
// // 		for (let i = 1; i <= createUserDto.noOfChairs!; i++) {
// // 			chairs.push({
// // 				chairNumber: i,
// // 				subAdminId: user._id,
// // 				subAdminEmail: user.email,
// // 			});
// // 		}
// // 		const chairData = await ChairsModel.insertMany(chairs);
// // 		return { user, chairs: chairData };
// // 	}
// // 	async getUserById(id: string): Promise<IUser | null> {
// // 		return User.findById(id);
// // 	}
// // 	async getUserByEmail(email: string): Promise<IUser | null> {
// // 		return User.findOne({ email }).select("+password");
// // 	}
// // 	async updateUser(id: string, updateData: Partial<IUser>) {
// // 		const user = await User.findByIdAndUpdate(id, updateData, { new: true });
// // 		let chairData;
// // 		if (updateData.noOfChairs !== undefined) {
// // 			const existingChairs = await ChairsModel.find({ subAdminId: user?._id });
// // 			const currentCount = existingChairs.length;
// // 			const newCount = updateData.noOfChairs;
// // 			//  Add new chairs
// // 			if (newCount > currentCount) {
// // 				const newChairs = [];
// // 				for (let i = currentCount + 1; i <= newCount; i++) {
// // 					newChairs.push({
// // 						chairNumber: i,
// // 						subAdminId: user?._id,
// // 						subAdminEmail: user?.email,
// // 						isChairAvailable: true,
// // 					});
// // 				}
// // 				chairData = await ChairsModel.insertMany(newChairs);
// // 			}
// // 			// Remove extra chairs (keep earlier ones)
// // 			if (newCount < currentCount) {
// // 				chairData = await ChairsModel.deleteMany({
// // 					subAdminId: user?._id,
// // 					chairNumber: { $gt: newCount },
// // 				});
// // 			}
// // 		}
// // 		return { user, chairs: chairData };
// // 	}
// // 	async deleteUser(id: string): Promise<void> {
// // 		await User.findByIdAndDelete(id);
// // 	}
// // 	async promoteToAdmin(
// // 		id: string,
// // 		adminId: Types.ObjectId
// // 	): Promise<IUser | null> {
// // 		return User.findByIdAndUpdate(
// // 			id,
// // 			{ role: UserRole.ADMIN, admin: adminId },
// // 			{ new: true }
// // 		);
// // 	}
// // 	async demoteToUser(id: string): Promise<IUser | null> {
// // 		return User.findByIdAndUpdate(id, { role: UserRole.USER }, { new: true });
// // 	}
// // 	async getAllUsers(): Promise<IUser[] | null> {
// // 		return User.find({
// // 			role: { $nin: ["superadmin"] }, // exclude superadmins
// // 		});
// // 	}
// // 	async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
// // 		if (!Types.ObjectId.isValid(id)) {
// // 			throw new Error("Invalid ObjectId");
// // 		}
// // 		return User.find({
// // 			admin: id,
// // 			role: { $nin: ["superadmin"] }, // exclude superadmins
// // 		});
// // 	}
// // }
// // export default new UserService();
// =======
// import { deleteUploadedFileById } from "../../mediaApi/services/deleteUploadedFile";
// import { saveUploadedFile } from "../../mediaApi/services/saveFile";
// import { updateUploadedFile } from "../../mediaApi/services/updateUploadedFile";
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
// import { ChairsModel } from "../../salonCharisApi/model/chairs.model";
// import User from "../models/User.model";
// import type { IUser } from "../types/user.types";
// import { UserRole } from "../types/user.types";
// import { Types } from "mongoose";
// import dayjs from "dayjs";
// class UserService {
// <<<<<<< HEAD
//   async createUser(createUserDto: {
//     fullName: string;
//     email: string;
//     password: string;
//     phone: string;
//     address: string;
//     isActive: boolean;
//     subscriptionPeriod: string;
//     customDate?: string; // for custom subscription
//     avatar?: string;
//     admin?: Types.ObjectId;
//     noOfChairs?: number;
//     role?: UserRole;
//     registrationCode?: string;
//     appName?: string;
//     appRegistrationCode?: string;
//   }) {
//     // Subscription start date
// const subscriptionStartDate = new Date();
// let subscriptionEndDate: Date = subscriptionStartDate;
// =======
// 	async createUser(createUserDto: {
// 		fullName: string;
// 		email: string;
// 		password: string;
// 		phone: string;
// 		address: string;
// 		isActive: boolean;
// 		subscriptionPeriod: string;
// 		expireDate?: Date;
// 		avatar?: Types.ObjectId;
// 		admin?: Types.ObjectId;
// 		noOfChairs?: number;
// 		role?: UserRole;
// 		registrationCode?: string;
// 		appName?: string;
// 		appRegistrationCode?: string;
// 	}) {
// 		const user = new User({
// 			...createUserDto,
// 			role: UserRole.ADMIN, // default role
// 		});
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
// if (createUserDto.subscriptionPeriod === "halfyearly") {
//   subscriptionEndDate = dayjs(subscriptionStartDate).add(6, "month").toDate();
// } else if (createUserDto.subscriptionPeriod === "yearly") {
//   subscriptionEndDate = dayjs(subscriptionStartDate).add(1, "year").toDate();
// } else if (createUserDto.subscriptionPeriod === "custom" && createUserDto.customDate) {
//   const parsedDate = dayjs(createUserDto.customDate, "YYYY-MM-DD", true);
//   if (!parsedDate.isValid()) {
//     throw new Error("Invalid customDate format, use YYYY-MM-DD");
//   }
//   subscriptionEndDate = parsedDate.toDate();
// }
// <<<<<<< HEAD
// =======
// 		await user.populate("avatar", "url");
// 		const chairs = [];
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
//     // Create user with subscription dates
//     const user = new User({
//       ...createUserDto,
//       role: UserRole.ADMIN,
//       subscriptionStartDate,
//       subscriptionEndDate,
//     });
//     await user.save();
//     //  Create chairs for this user
//     const chairs = [];
//     for (let i = 1; i <= (createUserDto.noOfChairs || 0); i++) {
//       chairs.push({
//         chairNumber: i,
//         subAdminId: user._id,
//         subAdminEmail: user.email,
//       });
//     }
// <<<<<<< HEAD
//     const chairData = await ChairsModel.insertMany(chairs);
//     return { user, chairs: chairData };
//   }
//   async getUserById(id: string): Promise<IUser | null> {
//     return User.findById(id);
//   }
// =======
// 	async getUserById(id: string): Promise<IUser | null> {
// 		return User.findById(id).populate("avatar", "url");
// 	}
// 	async getUserByEmail(email: string): Promise<IUser | null> {
// 		return User.findOne({ email })
// 			.select("+password")
// 			.populate("avatar", "url");
// 	}
// 	async updateUser(
// 		id: string,
// 		updateData: Partial<IUser>,
// 		file?: Express.Multer.File
// 	) {
// 		const user = await User.findById(id);
// 		if (!user) throw new Error("User not found");
// 		console.log(user);
// 		console.log(file);
// 		if (file) {
// 			if (user.avatar) {
// 				await updateUploadedFile(user.avatar as Types.ObjectId, file);
// 				console.log("ran avatar block");
// 			} else {
// 				const newFile = await saveUploadedFile(file);
// 				user.avatar = newFile._id;
// 			}
// 		}
// 		Object.assign(user, updateData);
// 		await user.save();
// 		await user.populate("avatar", "url");
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
//   async getUserByEmail(email: string): Promise<IUser | null> {
//     return User.findOne({ email }).select("+password");
//   }
//   async updateUser(id: string, updateData: Partial<IUser>) {
//     const user = await User.findByIdAndUpdate(id, updateData, { new: true });
//     let chairData;
//     if (updateData.noOfChairs !== undefined) {
//       const existingChairs = await ChairsModel.find({ subAdminId: user?._id });
//       const currentCount = existingChairs.length;
//       const newCount = updateData.noOfChairs;
//       // Add new chairs
//       if (newCount > currentCount) {
//         const newChairs = [];
//         for (let i = currentCount + 1; i <= newCount; i++) {
//           newChairs.push({
//             chairNumber: i,
//             subAdminId: user?._id,
//             subAdminEmail: user?.email,
//             isChairAvailable: true,
//           });
//         }
//         chairData = await ChairsModel.insertMany(newChairs);
//       }
// <<<<<<< HEAD
//       // Remove extra chairs
//       if (newCount < currentCount) {
//         chairData = await ChairsModel.deleteMany({
//           subAdminId: user?._id,
//           chairNumber: { $gt: newCount },
//         });
//       }
//     }
// =======
// 	async deleteUser(id: string): Promise<void> {
// 		const user = await User.findById(id);
// 		if (!user) throw new Error("User not found");
// 		// ✅ Delete avatar if it exists
// 		if (user.avatar) {
// 			try {
// 				await deleteUploadedFileById(user.avatar.toString());
// 			} catch (err) {
// 				console.error("Failed to delete avatar file:", err);
// 			}
// 		}
// 		// ✅ Now delete the user itself
// 		await User.findByIdAndDelete(id);
// 	}
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
//     return { user, chairs: chairData };
//   }
//   async deleteUser(id: string): Promise<void> {
//     await User.findByIdAndDelete(id);
//   }
// <<<<<<< HEAD
//   async promoteToAdmin(id: string, adminId: Types.ObjectId): Promise<IUser | null> {
//     return User.findByIdAndUpdate(
//       id,
//       { role: UserRole.ADMIN, admin: adminId },
//       { new: true }
//     );
//   }
//   async demoteToUser(id: string): Promise<IUser | null> {
//     return User.findByIdAndUpdate(id, { role: UserRole.USER }, { new: true });
//   }
//   async getAllUsers(): Promise<IUser[] | null> {
//     return User.find({
//       role: { $nin: ["superadmin"] },
//     });
//   }
//   async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid ObjectId");
//     }
//     return User.find({
//       admin: id,
//       role: { $nin: ["superadmin"] },
//     });
//   }
// =======
// 	async getAllUsers(): Promise<IUser[] | null> {
// 		return User.find({
// 			role: { $nin: ["superadmin"] }, // exclude superadmins
// 		}).populate("avatar", "url");
// 	}
// 	async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
// 		if (!Types.ObjectId.isValid(id)) {
// 			throw new Error("Invalid ObjectId");
// 		}
// 		return User.find({
// 			admin: id,
// 			role: { $nin: ["superadmin"] }, // exclude superadmins
// 		}).populate("avatar", "url");
// 	}
// >>>>>>> 9488caa707a1787bcf48fb3f5635aa583485d273
// }
// export default new UserService();
const mongoose_1 = require("mongoose");
const User_model_1 = __importDefault(require("../models/User.model"));
const chairs_model_1 = require("../../salonCharisApi/model/chairs.model");
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
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate).add(6, "month").toDate();
        }
        else if (period === "yearly") {
            subscriptionEndDate = (0, dayjs_1.default)(subscriptionStartDate).add(1, "year").toDate();
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
        return User_model_1.default.findOne({ email }).select("+password").populate("avatar", "url");
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
