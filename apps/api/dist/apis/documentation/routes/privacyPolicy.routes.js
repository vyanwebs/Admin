"use strict";
// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { upload } from "../../mediaApi/services/multerConfig";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post("/", upload.none(), createOrUpdatePrivacy);
// router.get("/", getPrivacy);
// // export default router;
// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { upload } from "../../mediaApi/services/multerConfig";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// const router = Router();
// router.post("/", protect, upload.none(), createOrUpdatePrivacy);
// router.get("/", getPrivacy);
// export default router;
// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
// const router = Router();
// // router.post("/", createOrUpdatePrivacy);
// //router.get("/", protect, getPrivacy);
// router.post(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   createOrUpdatePrivacy
// );
// router.get(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin","user"),
//   getPrivacy
// );
// export default router;
// import { Router } from "express";
// import { getPrivacy, createOrUpdatePrivacyMiddleware } from "../controllers/privacyPolicy.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
// const router = Router();
// // POST (admin + superadmin only)
// router.post(
// "/",
// protect,
// authorizeRole("admin", "superadmin"),
// createOrUpdatePrivacyMiddleware
// );
// // GET (admin, superadmin, user)
// router.get(
// "/",
// protect,
// authorizeRole("admin", "superadmin", "user"),
// getPrivacy
// );
// export default router;
const express_1 = require("express");
const privacyPolicy_controller_1 = require("../controllers/privacyPolicy.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = (0, express_1.Router)();
// POST - Create/Update (admin + superadmin only)
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), privacyPolicy_controller_1.createOrUpdatePrivacyMiddleware);
// GET - Fetch Privacy Policy (all roles)
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), privacyPolicy_controller_1.getPrivacy);
exports.default = router;
