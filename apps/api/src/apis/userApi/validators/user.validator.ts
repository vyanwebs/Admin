import { z } from "zod";
import { UserRole, SubscriptionType, Gender } from "../types/user.types";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, "Full name is required"),

    // optional support for first/last names (auto handled later)
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    subAdminId: z.string().optional(),
    subAdminEmail: z.string().optional(),

    email: z.string().email(),
    password: z.string().min(4, "Password must be at least 4 characters"),
    // confirmPassword: z.string().min(8, "Confirm password is required"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    referralCode: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
    subscriptionType: z.nativeEnum(SubscriptionType).optional(),
  }),
});

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  subscriptionType: z.nativeEnum(SubscriptionType).optional(),
  bio: z.string().optional(),
});
