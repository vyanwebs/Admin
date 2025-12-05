"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middlewares/validate");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multerConfig_1 = __importDefault(require("../../mediaApi/services/multerConfig"));
const razorpay_controller_1 = require("../../razorpay/controller/razorpay.controller");
const authorizeRole_1 = require("../middlewares/authorizeRole");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, auth_controller_1.updateToken);
router.post("/register", multerConfig_1.default.single("avatar"), //  handle avatar upload
// validate(createUserSchema),
auth_controller_1.register);
//router.post('/register', validate(createUserSchema), register);
router.post("/login", validate_1.validateLogin, auth_controller_1.login);
router.get("/logout", auth_middleware_1.protect, auth_controller_1.userLogout);
router.put("/profile", auth_middleware_1.protect, multerConfig_1.default.single("avatar"), auth_controller_1.updateProfile);
router.get("/profile", auth_middleware_1.protect, auth_controller_1.getUserProfile);
router.get("/check-email", auth_controller_1.checkUserEmailExists);
router.put("/profile-update", auth_middleware_1.protect, multerConfig_1.default.single("avatar"), auth_controller_1.updateUserInfo);
router.put("/send-otp", auth_controller_1.generateOTP);
router.delete("/delete-user-by-id/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), user_controller_1.deleteUser);
router.patch("/toggle-user-status-by-id/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), user_controller_1.enableDisableUser);
// razorpay routes
router.post("/generate-order-id", auth_middleware_1.protect, razorpay_controller_1.generateOrderId);
router.post("/verify-order-id", auth_middleware_1.protect, razorpay_controller_1.verifyOrderId);
router.post("/refund", auth_middleware_1.protect, razorpay_controller_1.refundPayment);
exports.default = router;
