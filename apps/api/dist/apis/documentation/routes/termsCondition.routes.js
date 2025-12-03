"use strict";
// import { Router } from "express";
// import { createOrUpdateTerms, getTerms } from "../controllers/termsCondition.controller";
// import { upload } from "../../mediaApi/services/multerConfig";
// //import { protect } from "../../middleware/auth.middleware"; // same as About Us
// import { protect } from "../../userApi/middlewares/auth.middleware";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post("/", protect, upload.none(), createOrUpdateTerms);
// router.get("/", getTerms);
// export default router;
const express_1 = require("express");
const termsCondition_controller_1 = require("../controllers/termsCondition.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.none(), // ⭐ REQUIRED FOR FORM DATA
termsCondition_controller_1.createOrUpdateTermsMiddleware, termsCondition_controller_1.createOrUpdateTerms);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), termsCondition_controller_1.getTerms);
exports.default = router;
