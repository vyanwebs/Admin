"use strict";
// // routes/certificate.routes.ts
// import express from "express";
// import { upload } from "../../mediaApi/services/multerConfig";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
// import {
//   uploadCertificate,
//   getAllCertificates,
//   deleteCertificate,
//   updateCertificate, // ✅ Add this import
// } from "../controllers/certificate.controllers";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post(
//   "/upload",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   upload.single("certificateImage"),
//   uploadCertificate
// );
// router.get("/", protect, getAllCertificates);
// // ✅ Add the update route
// router.put(
//   "/:id",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   upload.single("certificateImage"), // Use same field name
//   updateCertificate
// );
// router.delete(
//   "/:id",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   deleteCertificate
// );
// export default router;
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const certificate_controllers_1 = require("../controllers/certificate.controllers");
const router = express_1.default.Router();
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("certificateImage"), certificate_controllers_1.uploadCertificate);
router.get("/", certificate_controllers_1.getAllCertificates);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("certificateImage"), certificate_controllers_1.updateCertificate);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), certificate_controllers_1.deleteCertificate);
exports.default = router;
