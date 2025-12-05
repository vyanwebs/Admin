import { Request, Response } from "express";
import UserService from "../services/user.service";
import { IUser, UserRole } from "../types/user.types";
import { Types } from "mongoose";
import User from "../models/User.model";
import { saveUploadedFile } from "../../mediaApi/services/saveFile";
import { nanoid } from "nanoid";
import { updateUploadedFile } from "../../mediaApi/services/updateUploadedFile";
import dayjs from "dayjs";

// =======================================================
// CREATE USER (SUB ADMIN)
// =======================================================
export const createUser = async (req: Request, res: Response) => {
	try {
		const {
			fullName,
			password,
			phone,
			address,
			status,
			subscriptionPeriod,
			customDate,
			noOfChairs,
			email,
		} = req.body;

		// Upload Image
		let imageId;
		if (req.file) {
			imageId = await saveUploadedFile(req.file);
		}

		// Auto-generated APK Name
		const count = await User.countDocuments();
		const appName = `app${count + 1}.apk`;

		// Auto Registration Code
		const appRegistrationCode = `NAU${nanoid(7).toUpperCase()}`;

		// Default 0 chairs
		const chairs = Number(noOfChairs) || 0;

		// Subscription Dates
		const subscriptionStartDate = new Date();
		let subscriptionEndDate: Date | undefined = undefined;

		if (subscriptionPeriod === "halfyearly") {
			subscriptionEndDate = dayjs(subscriptionStartDate)
				.add(6, "month")
				.toDate();
		} else if (subscriptionPeriod === "yearly") {
			subscriptionEndDate = dayjs(subscriptionStartDate)
				.add(1, "year")
				.toDate();
		} else if (subscriptionPeriod === "custom" && customDate) {
			subscriptionEndDate = dayjs(customDate).toDate();
		}

		// Create User
		const newUser = await UserService.createUser({
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
			role: UserRole.ADMIN,
			appName,
			appRegistrationCode,
		});

		res.status(201).json({ message: "User created", user: newUser });
	} catch (error: any) {
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

// =======================================================
// GET USER BY ID
// =======================================================
export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await UserService.getUserById(req.params.id);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// =======================================================
// GET USER BY EMAIL
// =======================================================
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (typeof email !== "string") {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================================
// UPDATE USER
// =======================================================
export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.find({
			_id: req.params.id,
			admin: req.user?._id,
		});

		if (!user) {
			res.status(401).json({ error: "Not authorized" });
			return;
		}

		const updated = await UserService.updateUser(
			req.params.id,
			req.body,
			req.file
		);

		if (!updated) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.status(200).json({ message: "User updated", user: updated });
	} catch (err: any) {
		res.status(400).json({ error: err.message });
	}
};

// =======================================================
// DELETE USER
// =======================================================
export const deleteUser = async (req: Request, res: Response) => {
	try {
		await UserService.deleteUser(req.params.id);
		res.status(204).send();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
// =======================================================
// ENABLE / DISABLE USER
// =======================================================
export const enableDisableUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $set: { isActive: !user.isActive } }, // ✔ only update this field
			{ new: true, runValidators: false } // ✔ no full validation
		);

		res.status(200).json({
			success: true,
			message: "User status updated successfully",
			data: updatedUser,
		});
	} catch (err: any) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

// =======================================================
// PROMOTE USER
// =======================================================
export const promoteUser = async (req: Request, res: Response) => {
	try {
		const user = await UserService.promoteToAdmin(
			req.params.id,
			req.user?._id as Types.ObjectId
		);
		res.status(200).json({ message: "User promoted to admin", user });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// =======================================================
// DEMOTE USER
// =======================================================
export const demoteUser = async (req: Request, res: Response) => {
	try {
		const user = await UserService.demoteToUser(req.params.id);
		res.status(200).json({ message: "User demoted to user", user });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// =======================================================
// GET ALL USERS
// =======================================================
export const getAllUser = async (req: Request, res: Response) => {
	try {
		let users: IUser[] | null;

		if (req.user?.role.toLowerCase() === "superadmin") {
			users = await UserService.getAllUsers();
		} else {
			users = await UserService.getAllUsersForAdmin(
				req.user?._id as Types.ObjectId
			);
		}

		res.status(200).json(users);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
