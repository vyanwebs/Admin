import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packages.controller";
import { upload } from "../../mediaApi/services/multerConfig";

import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = express.Router();

// CREATE
router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"),
  createPackage
);

// READ
//router.get("/", protect, getAllPackages);

router.get(
  "/",
  protect,
  authorizeRole("admin", "superadmin", "user"),
  getAllPackages
);

router.get("/:id", protect, getPackageById);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("image"),
  updatePackage
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deletePackage
);

export default router;
