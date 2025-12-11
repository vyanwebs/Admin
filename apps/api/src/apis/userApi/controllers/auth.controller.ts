import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../types/user.types";
import mongoose, { Types } from "mongoose";
import { validate } from "../middlewares/validate";
import { saveUploadedFile } from "../../mediaApi/services/saveFile";
import { deleteUploadedFileFromReqFile } from "../../mediaApi/services/deleteUploadedFileFromReqFile";
import { IUploadedFile } from "../../mediaApi/models/uploadedFile";
import { updateUploadedFile } from "../../mediaApi/services/updateUploadedFile";
import { updateUserSchema } from "../validators/user.validator"; // Your Zod schema
import { sendOTP } from "../../../config/mailconfig";
import { EmailOTP } from "../models/UserOTP.model";
import { nanoid } from "nanoid";
import { parse } from "path";
import bcrypt from "bcryptjs";
export const register = async (req: Request, res: Response) => {
	try {
		const userData: CreateUserDto = req.body;

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
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			res.status(409).json({ message: "Email already in use" });
			return;
		}

		// for production enable this
		// const storedOTP = await EmailOTP.findOne({ email: userData.email });

		// if (Number(otp) !== storedOTP?.otp) {
		// 	return res.status(403).json({ success: false, message: "Incorrect OTP" });
		// }
		// Normal registration

		const userDetails = await User.findOne({
			appRegistrationCode: userData.appRegistrationCode,
		});
		if (!userDetails?._id || !userDetails.email) {
			return res.status(401).json({
				success: false,
				message: "App Registration Code is incorrect",
			});
		}
		
		let imageId;
		if (req.file) {
			imageId = await saveUploadedFile(req.file);
		}

		const user = new User({
			...userData,
			avatar: imageId || undefined,
			subAdminEmail: userDetails.email,
			subAdminId: userDetails._id,
		});

		user.isActive = true;

		await EmailOTP.findOneAndDelete({ email: userData.email });

		const referralCode = "NAU" + nanoid(7).toUpperCase(); //generates 8 character code

		user.referralCode = referralCode;

		// Handle referral case
		if (userData.referredBy) {
			const referredByUser = await User.findOne({
				referralCode: userData.referredBy,
			});

			if (referredByUser?.appRegistrationCode === user.appRegistrationCode) {
				user.wallet = (user?.wallet ?? 0) + 20;
				referredByUser.wallet = (referredByUser?.wallet ?? 0) + 20;

				user.referredBy = referredByUser._id as mongoose.Types.ObjectId;
				await referredByUser.save();
			} else {
				return res.status(401).json({
					success: false,
					message: "Incorrect referral Code or SubAdmin mismatch",
				});
			}
		}
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
				// ...formatUserResponse(user),
				user,
				refLink: user.refLink,
			},
			//
			token,
		});
		// } else {
		// 	return res.status(401).json({ success: false, message: "Invalid OTP" });
		// }
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({
			message: "Registration failed",
			error: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return;
	}
};

// Helper function for referral registration
const handleReferralRegistration = async (
	req: Request,
	res: Response,
	userData: CreateUserDto,
	ref: string
) => {
	if (!mongoose.Types.ObjectId.isValid(ref)) {
		return res.status(400).json({ message: "Invalid referral ID format" });
	}

	const refUser = await User.findById(ref);
	if (!refUser) {
		return res.status(404).json({ message: "Referral user not found" });
	}

	const user = await User.create({
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
const formatUserResponse = (user: IUser) => ({
	_id: user._id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
	role: user.role,
	createdAt: user.createdAt,
});

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		let user: IUser | null = await User.findOne({ email }).select("+password");

		if (!user?.isActive) {
			return res.status(401).json({
				success: false,
				message: "You have been blocked by sub admin",
			});
		}
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
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// controllers/token.controller.ts

export const updateToken = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = (req as any).user;

		if (!user || !user._id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const foundUser = await User.findById(user._id).populate({
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
				avatar: (foundUser.avatar as any)?.url || null, // ✅ populated avatar
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
	} catch (error) {
		console.error("Token refresh error:", error);
		res.status(500).json({ message: "Token refresh failed", error });
	}
};

/////////
export const updateProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		if (!req.file) {
			res.status(400).json({ error: "No file uploaded" });
			return;
		}

		const userId = req.user?._id;
		if (!userId) {
			res.status(401).json({ error: "Unauthorized user" });
			return;
		}

		let avatar: IUploadedFile | Types.ObjectId | any;

		const existingAvatarId =
			(req.user?.avatar as Types.ObjectId) || req.user?.avatar?._id;
		if (existingAvatarId) {
			const avatarId = new Types.ObjectId(existingAvatarId);
			avatar = await updateUploadedFile(avatarId, req.file);
		} else {
			avatar = await saveUploadedFile(req.file);
		}

		await User.findByIdAndUpdate(userId, { avatar: avatar._id });

		res.status(200).json({ url: avatar.url });
	} catch (err: any) {
		if (req.file) {
			deleteUploadedFileFromReqFile(req.file);
		}
		console.error("Error updating profile:", err);
		res.status(500).json({ error: err.message || "Server error" });
	}
};

export const getUserProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = (req as any).user;

		if (!user || !user._id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const foundUser = await User.findById(user._id).populate({
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
				fullName: foundUser.fullName,
				avatar: (foundUser.avatar as any)?.url || null,
				// phone: foundUser.phone || null,
				phoneNumber: foundUser.phoneNumber || null,
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
				referralCode: foundUser.referralCode,
			},
		});
	} catch (error) {
		console.error("Get profile error:", error);
		res.status(500).json({ message: "Failed to fetch user profile", error });
	}
};

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

export const updateUserInfo = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId = (req as any).user?._id;

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

		const user = await User.findById(userId);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		// Handle avatar
		if (req.file) {
			if (user.avatar) {
				await updateUploadedFile(user.avatar as Types.ObjectId, req.file);
			} else {
				const newFile = await saveUploadedFile(req.file);
				user.avatar = (newFile as any)._id;
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
	} catch (error: any) {
		console.error("Update user info error:", error);
		res.status(500).json({
			message: "Something went wrong",
			error: error.message,
		});
	}
};

export const checkUserEmailExists = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { email } = req.query;

		if (!email || typeof email !== "string") {
			res.status(400).json({ message: "Email is required" });
			return;
		}

		const exists = await User.exists({ email });
		res.status(200).json({ exists: !!exists });
		return;
	} catch (error: any) {
		console.error("Email check error:", error);
		res.status(500).json({ message: "Server error" });
		return;
	}
};

// generate otp for email
export const generateOTP = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const otp = await sendOTP(email);

		if (otp) {
			return res
				.status(200)
				.json({ success: true, message: "OTP Generated Successfully" });
		} else {
			return res
				.status(500)
				.json({ success: false, message: "Failed to send otp" });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};

export const userLogout = async (req: Request, res: Response) => {
	try {
		return res.cookie("token", "").status(200).json({
			success: true,
			message: "User has been logout successfully!",
			data: null,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: (error as Error).message,
		});
	}
};

// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email, otp, password } = req.body;
		const storedOTP = await EmailOTP.findOne({ email: email });

		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "email is not registered" });
		}

		if (Number(otp) !== storedOTP?.otp) {
			return res.status(403).json({ success: false, message: "Incorrect OTP" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ password: hashedPassword },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "User Updated Successfully",
			data: updatedUser,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: (error as Error).message });
	}
};
