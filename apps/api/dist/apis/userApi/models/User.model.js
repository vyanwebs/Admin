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
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const user_types_1 = require("../types/user.types");
const jwt_1 = require("../../../config/jwt");
const nanoid_1 = require("nanoid");
const userSchema = new mongoose_1.Schema({
    refLink: { type: String, unique: true, default: null },
    referralCode: { type: String, unique: true, default: null },
    admin: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    referredBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    // ✅ Make firstName & lastName optional (they’ll be auto-filled from fullName)
    firstName: { type: String, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
    // ✅ Keep fullName required but auto-generate it if missing
    fullName: { type: String, trim: true, maxlength: 100 },
    noOfChairs: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    password: { type: String, required: true, minlength: 8, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        type: String,
        enum: Object.values(user_types_1.UserRole),
        default: user_types_1.UserRole.USER,
    },
    permissions: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    subscription: { type: mongoose_1.Schema.Types.ObjectId, ref: "Subscription" },
    subscriptionType: {
        type: String,
        enum: Object.values(user_types_1.SubscriptionType),
        default: user_types_1.SubscriptionType.FREE,
    },
    subscriptionPeriod: {
        type: String,
        enum: ["halfyearly", "yearly", "custom", "biannual"],
        default: "halfyearly",
    },
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    subscriptionStatus: {
        type: String,
        enum: Object.values(user_types_1.SubscriptionStatus),
        default: user_types_1.SubscriptionStatus.PENDING,
    },
    paymentMethod: { type: String, enum: Object.values(user_types_1.PaymentMethod) },
    address: { type: String },
    billingInfo: {
        address: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
    },
    avatar: { type: mongoose_1.Types.ObjectId, ref: "UploadedFile" },
    // avatar: { type: String },
    appName: {
        type: String,
    },
    appRegistrationCode: {
        type: String,
        unique: true,
    },
    subAdminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    subAdminEmail: { type: String },
    bio: { type: String, maxlength: 500 },
    dateOfBirth: Date,
    gender: { type: String, enum: Object.values(user_types_1.Gender) },
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
    },
    preferences: {
        theme: {
            type: String,
            enum: Object.values(user_types_1.ThemePreference),
            default: user_types_1.ThemePreference.LIGHT,
        },
        language: { type: String, default: "en" },
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
        },
    },
    loginCount: { type: Number, default: 0 },
    lastLogin: Date,
    devices: [
        {
            deviceType: String,
            os: String,
            browser: String,
            ipAddress: String,
            lastAccess: Date,
        },
    ],
    wallet: { type: Number, default: 0 },
    phoneNumber: { type: Number, min: 1000000000, max: 9999999999 },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
// Auto-generate missing name fields
// userSchema.pre<IUser>("save", function (next) {
// 	if (!this.fullName && this.firstName && this.lastName) {
// 		this.fullName = `${this.firstName} ${this.lastName}`;
// 	} else if (!this.firstName && this.fullName) {
// 		const parts = this.fullName.split(" ");
// 		this.firstName = parts[0];
// 		this.lastName = parts.slice(1).join(" ");
// 	}
// 	next();
// });
// Password hash
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});
// Virtuals
userSchema.virtual("isSubscriptionActive").get(function () {
    if (!this.subscriptionEndDate)
        return false;
    return (this.subscriptionStatus === user_types_1.SubscriptionStatus.ACTIVE &&
        this.subscriptionEndDate > new Date());
});
// Methods
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs_1.default.compare(candidatePassword, this.password);
};
userSchema.methods.generateAuthToken = function () {
    const payload = { id: this._id, role: this.role };
    return jsonwebtoken_1.default.sign(payload, jwt_1.jwtConfig.secret, {
        expiresIn: jwt_1.jwtConfig.expiresIn,
    });
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
userSchema.pre("save", function (next) {
    if (!this.refLink) {
        this.refLink = (0, nanoid_1.nanoid)(10);
    }
    next();
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
