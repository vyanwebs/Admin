"use strict";
// import { Router } from "express";
// import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
// import { upload } from "../../mediaApi/services/multerConfig"; // existing multer
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// // POST route (form-data text-only)
// router.post("/", upload.none(), createOrUpdateAboutUs);
// // GET route
// router.get("/", getAboutUs);
// export default router;
const express_1 = require("express");
const aboutUs_controller_1 = require("../controllers/aboutUs.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, multerConfig_1.upload.none(), aboutUs_controller_1.createOrUpdateAboutUs);
router.get("/", aboutUs_controller_1.getAboutUs);
exports.default = router;
