// import express from "express";
// import {
//   createPackage,
//   getAllPackages,
//   getPackageById,
//   updatePackage,
//   deletePackage,
// } from "../controllers/packages.controller";
// import { upload } from "../../mediaApi/services/multerConfig"; // your reusable multer setup

// const router = express.Router();

// // Create a new package
// router.post("/upload", upload.single("image"), createPackage);

// // Get all packages
// router.get("/", getAllPackages);

// // Get a package by ID
// router.get("/:id", getPackageById);

// // Update a package
// router.put("/:id", upload.single("image"), updatePackage);

// // Delete a packagez
// router.delete("/:id", deletePackage);

// export default router;

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
router.get("/", protect, getAllPackages);
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
