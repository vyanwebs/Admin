"use strict";
// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   createAboutSalon,
//   getAllAboutSalon,
//   getAboutSalonById,
//   updateAboutSalon,
//   deleteAboutSalon,
// } from "../controllers/aboutSalon.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// // Multer setup for image upload
// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, path.join(__dirname, "../../../../uploads/aboutSalon"));
//   },
//   filename: (_req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });
// // Routes
// router.post("/", protect, authorizeRole("admin", "superadmin"), upload.single("image"), createAboutSalon);
// router.put("/:id", protect, authorizeRole("admin", "superadmin"), upload.single("image"), updateAboutSalon);
// router.get("/", protect, getAllAboutSalon);
// router.get("/:id", protect, getAboutSalonById);
// router.delete("/:id", protect, authorizeRole("admin", "superadmin"), deleteAboutSalon);
// export default router;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const aboutSalon_controller_1 = require("../controllers/aboutSalon.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = express_1.default.Router();
// ✅ Ensure upload folder exists
const uploadDir = path_1.default.join(__dirname, "../../../../uploads/aboutSalon");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ Created folder:", uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Routes
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.single("image"), aboutSalon_controller_1.createAboutSalon);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.single("image"), aboutSalon_controller_1.updateAboutSalon);
router.get("/", auth_middleware_1.protect, aboutSalon_controller_1.getAllAboutSalon);
router.get("/:id", auth_middleware_1.protect, aboutSalon_controller_1.getAboutSalonById);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), aboutSalon_controller_1.deleteAboutSalon);
exports.default = router;
