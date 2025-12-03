"use strict";
// // import { Router } from "express";
// // import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
// // import { upload } from "../../mediaApi/services/multerConfig"; // existing multer
Object.defineProperty(exports, "__esModule", { value: true });
// // const router = Router();
// // // POST route (form-data text-only)
// // router.post("/", upload.none(), createOrUpdateAboutUs);
// // // GET route
// // router.get("/", getAboutUs);
// // export default router;
// // import { Router } from "express";
// // import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
// // import { protect } from "../../userApi/middlewares/auth.middleware";
// // import { upload } from "../../mediaApi/services/multerConfig";
// // const router = Router();
// // router.post(
// //   "/",
// //   protect,           
// //   upload.none(),     
// //   createOrUpdateAboutUs
// // );
// // router.get("/", getAboutUs);
// // export default router;
// // routes/aboutUs.routes.ts
// import { Router } from "express";
// import { getAboutUs } from "../controllers/aboutUs.controller";
// import { createOrUpdateAboutUsMiddleware } from "../controllers/aboutUs.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
// const router = Router();
// router.post(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin", "user"),
//   createOrUpdateAboutUsMiddleware
// );
// router.get(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin", "user"),
//   getAboutUs
// );
// export default router;
const express_1 = require("express");
const aboutUs_controller_1 = require("../controllers/aboutUs.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), aboutUs_controller_1.createOrUpdateAboutUsMiddleware);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), aboutUs_controller_1.getAboutUs);
exports.default = router;
