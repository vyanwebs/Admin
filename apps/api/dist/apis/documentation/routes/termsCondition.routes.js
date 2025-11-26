"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const termsCondition_controller_1 = require("../controllers/termsCondition.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
//import { protect } from "../../middleware/auth.middleware"; // same as About Us
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, multerConfig_1.upload.none(), termsCondition_controller_1.createOrUpdateTerms);
router.get("/", termsCondition_controller_1.getTerms);
exports.default = router;
