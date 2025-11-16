// import { ChairsModel } from "../../salonCharisApi/model/chairs.model";
// import { createUser } from "../controllers/user.controller";
// import { CreateUserDto } from "../dtos/create-user.dto";
// import User from "../models/User.model";
// import type { IUser } from "../types/user.types";
// import { UserRole } from "../types/user.types";
// import { Types } from "mongoose";

// class UserService {
// 	async createUser(createUserDto: {
// 		fullName: string;
// 		email: string;
// 		password: string;
// 		phone: string;
// 		address: string;
// 		isActive: boolean;
// 		subscriptionPeriod: string;
// 		expireDate?: Date;
// 		avatar?: string;
// 		admin?: Types.ObjectId;
// 		noOfChairs?: number;
// 		role?: UserRole;
// 		registrationCode?: string;
// 		appName?: string;
// 		appRegistrationCode?: string;
// 	}) 
// 	 {
// 	 	const now = new Date();
// 	     let endDate = new Date(now);
		
// 		if(createUserDto.subscriptionPeriod === "halfyearly"){
// 			endDate.setMonth(endDate.getMonth() + 6);
// 		}
// 		else if(createUserDto.subscriptionPeriod === "yearly"){
// 			endDate.setFullYear(endDate.getFullYear()+1);
// 		}
// 		else if(createUserDto.subscriptionPeriod === "custom" && createUserDto.expireDate){
// 			 endDate = new Date(createUserDto.expireDate);
// 		}
// 	}

// 		const user = new User({
// 			...createUserDto,
// 			role : UserRole.ADMIN,
// 			    subscriptionStartDate: now,
// 				    subscriptionEndDate: endDate,

// 			role: UserRole.ADMIN, // default role
// 		});

// 		await user.save();

// 		const chairs = [];

// 		for (let i = 1; i <= createUserDto.noOfChairs!; i++) {
// 			chairs.push({
// 				chairNumber: i,
// 				subAdminId: user._id,
// 				subAdminEmail: user.email,
// 			});
// 		}

// 		const chairData = await ChairsModel.insertMany(chairs);

// 		return { user, chairs: chairData };
// 	}

// 	async getUserById(id: string): Promise<IUser | null> {
// 		return User.findById(id);
// 	}

// 	async getUserByEmail(email: string): Promise<IUser | null> {
// 		return User.findOne({ email }).select("+password");
// 	}

// 	async updateUser(id: string, updateData: Partial<IUser>) {
// 		const user = await User.findByIdAndUpdate(id, updateData, { new: true });

// 		let chairData;
// 		if (updateData.noOfChairs !== undefined) {
// 			const existingChairs = await ChairsModel.find({ subAdminId: user?._id });
// 			const currentCount = existingChairs.length;
// 			const newCount = updateData.noOfChairs;

// 			//  Add new chairs
// 			if (newCount > currentCount) {
// 				const newChairs = [];
// 				for (let i = currentCount + 1; i <= newCount; i++) {
// 					newChairs.push({
// 						chairNumber: i,
// 						subAdminId: user?._id,
// 						subAdminEmail: user?.email,
// 						isChairAvailable: true,
// 					});
// 				}
// 				chairData = await ChairsModel.insertMany(newChairs);
// 			}

// 			// Remove extra chairs (keep earlier ones)
// 			if (newCount < currentCount) {
// 				chairData = await ChairsModel.deleteMany({
// 					subAdminId: user?._id,
// 					chairNumber: { $gt: newCount },
// 				});
// 			}
// 		}

// 		return { user, chairs: chairData };
// 	}

// 	async deleteUser(id: string): Promise<void> {
// 		await User.findByIdAndDelete(id);
// 	}

// 	async promoteToAdmin(
// 		id: string,
// 		adminId: Types.ObjectId
// 	): Promise<IUser | null> {
// 		return User.findByIdAndUpdate(
// 			id,
// 			{ role: UserRole.ADMIN, admin: adminId },
// 			{ new: true }
// 		);
// 	}

// 	async demoteToUser(id: string): Promise<IUser | null> {
// 		return User.findByIdAndUpdate(id, { role: UserRole.USER }, { new: true });
// 	}

// 	async getAllUsers(): Promise<IUser[] | null> {
// 		return User.find({
// 			role: { $nin: ["superadmin"] }, // exclude superadmins
// 		});
// 	}

// 	async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
// 		if (!Types.ObjectId.isValid(id)) {
// 			throw new Error("Invalid ObjectId");
// 		}
// 		return User.find({
// 			admin: id,
// 			role: { $nin: ["superadmin"] }, // exclude superadmins
// 		});
// 	}
// }

// export default new UserService();

import { ChairsModel } from "../../salonCharisApi/model/chairs.model";
import User from "../models/User.model";
import type { IUser } from "../types/user.types";
import { UserRole } from "../types/user.types";
import { Types } from "mongoose";
import dayjs from "dayjs";

class UserService {
  async createUser(createUserDto: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isActive: boolean;
    subscriptionPeriod: string;
    customDate?: string; // for custom subscription
    avatar?: string;
    admin?: Types.ObjectId;
    noOfChairs?: number;
    role?: UserRole;
    registrationCode?: string;
    appName?: string;
    appRegistrationCode?: string;
  }) {
    // Subscription start date
const subscriptionStartDate = new Date();
let subscriptionEndDate: Date = subscriptionStartDate;

if (createUserDto.subscriptionPeriod === "halfyearly") {
  subscriptionEndDate = dayjs(subscriptionStartDate).add(6, "month").toDate();
} else if (createUserDto.subscriptionPeriod === "yearly") {
  subscriptionEndDate = dayjs(subscriptionStartDate).add(1, "year").toDate();
} else if (createUserDto.subscriptionPeriod === "custom" && createUserDto.customDate) {
  const parsedDate = dayjs(createUserDto.customDate, "YYYY-MM-DD", true);
  if (!parsedDate.isValid()) {
    throw new Error("Invalid customDate format, use YYYY-MM-DD");
  }
  subscriptionEndDate = parsedDate.toDate();
}


    // Create user with subscription dates
    const user = new User({
      ...createUserDto,
      role: UserRole.ADMIN,
      subscriptionStartDate,
      subscriptionEndDate,
    });

    await user.save();

    //  Create chairs for this user
    const chairs = [];
    for (let i = 1; i <= (createUserDto.noOfChairs || 0); i++) {
      chairs.push({
        chairNumber: i,
        subAdminId: user._id,
        subAdminEmail: user.email,
      });
    }

    const chairData = await ChairsModel.insertMany(chairs);

    return { user, chairs: chairData };
  }

  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select("+password");
  }

  async updateUser(id: string, updateData: Partial<IUser>) {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    let chairData;
    if (updateData.noOfChairs !== undefined) {
      const existingChairs = await ChairsModel.find({ subAdminId: user?._id });
      const currentCount = existingChairs.length;
      const newCount = updateData.noOfChairs;

      // Add new chairs
      if (newCount > currentCount) {
        const newChairs = [];
        for (let i = currentCount + 1; i <= newCount; i++) {
          newChairs.push({
            chairNumber: i,
            subAdminId: user?._id,
            subAdminEmail: user?.email,
            isChairAvailable: true,
          });
        }
        chairData = await ChairsModel.insertMany(newChairs);
      }

      // Remove extra chairs
      if (newCount < currentCount) {
        chairData = await ChairsModel.deleteMany({
          subAdminId: user?._id,
          chairNumber: { $gt: newCount },
        });
      }
    }

    return { user, chairs: chairData };
  }

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async promoteToAdmin(id: string, adminId: Types.ObjectId): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      id,
      { role: UserRole.ADMIN, admin: adminId },
      { new: true }
    );
  }

  async demoteToUser(id: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { role: UserRole.USER }, { new: true });
  }

  async getAllUsers(): Promise<IUser[] | null> {
    return User.find({
      role: { $nin: ["superadmin"] },
    });
  }

  async getAllUsersForAdmin(id: Types.ObjectId): Promise<IUser[] | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    return User.find({
      admin: id,
      role: { $nin: ["superadmin"] },
    });
  }
}

export default new UserService();
