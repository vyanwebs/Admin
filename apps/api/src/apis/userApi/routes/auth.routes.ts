import express from "express";
import {
  register,
  login,
  updateToken,
  updateProfile,
  getUserProfile,
  updateUserInfo,
  checkUserEmailExists,
  generateOTP,
  userLogout,
} from "../controllers/auth.controller";
import { validate, validateLogin } from "../middlewares/validate";
import { createUserSchema } from "../validators/user.validator";
import { protect } from "../middlewares/auth.middleware";
import upload from "../../mediaApi/services/multerConfig";
import {
  generateOrderId,
  refundPayment,
  verifyOrderId,
} from "../../razorpay/controller/razorpay.controller";
import { authorizeRole } from "../middlewares/authorizeRole";
import { deleteUser, enableDisableUser } from "../controllers/user.controller";

const router = express.Router();
router.post("/", protect, updateToken);
router.post(
  "/register",
  upload.single("avatar"), //  handle avatar upload
  // validate(createUserSchema),
  register
);
//router.post('/register', validate(createUserSchema), register);
router.post("/login", validateLogin, login);
router.get("/logout", protect, userLogout);
router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.get("/profile", protect, getUserProfile);
router.get("/check-email", checkUserEmailExists);
router.put("/profile-update", protect, upload.single("avatar"), updateUserInfo);
router.put("/send-otp", generateOTP);
router.delete(
	"/delete-user-by-id/:id",
	protect,
	authorizeRole("admin", "superadmin"),
	deleteUser
);
router.patch(
	"/toggle-user-status-by-id/:id",
	protect,
	authorizeRole("admin", "superadmin"),
	enableDisableUser
);

// razorpay routes
router.post("/generate-order-id", protect, generateOrderId);
router.post("/verify-order-id", protect, verifyOrderId);
router.post("/refund", protect, refundPayment);

export default router;
