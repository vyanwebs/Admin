// src/apis/ourserviceApi/routes/ourservice.routes.ts
import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
	createOurService,
	getAllOurServices,
	deleteOurService,
} from "../controllers/ourservice.controller";
//routes
const router = express.Router();

// 🟢 Create Service
router.post(
	"/upload",
	protect,
	authorizeRole("admin", "superadmin"),
	upload.single("imageUrl"),
	createOurService
);

// 🟢 Get All Services
router.get("/", protect, getAllOurServices);

// 🔴 Delete Service
router.delete(
	"/:id",
	protect,
	authorizeRole("admin", "superadmin"),
	deleteOurService
);

export default router;
