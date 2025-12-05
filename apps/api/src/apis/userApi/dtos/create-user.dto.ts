import type { Types } from "mongoose";
import { UserRole, SubscriptionType, Gender } from "../types/user.types";
import mongoose from "mongoose";
import { IUploadedFile } from "../../mediaApi/models/uploadedFile";

export class CreateUserDto {
	admin?: Types.ObjectId;
	firstName!: string;
	lastName!: string;
	fullName!: string;
	email!: string;
	phone?: string;
	password!: string;
	confirmPassword!: string;
	address?: string;
	role?: UserRole;
	subscriptionType?: SubscriptionType;
	referredBy?: mongoose.Types.ObjectId | string | null;

	// Missing Fields (ADDED NOW)
	subscriptionPeriod?: "biannual" | "halfyearly" | "yearly" | "custom";
	customDate?: Date;

	dateOfBirth?: Date;
	referralCode?: string;
	avatar?: mongoose.Types.ObjectId | IUploadedFile;
	otp?: number;
	noOfChairs?: number;
	gender?: Gender;
	appRegistrationCode?: string;
	subAdminEmail?: string;

	subscriptionStartDate?: Date;
	subscriptionEndDate?: Date;

	subAdminId?: Types.ObjectId;
	phoneNumber?: number;
}
