"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const productPackage_controller_1 = require("../controllers/productPackage.controller");
const router = express_1.default.Router();
// Only admin/superadmin can create/update/delete
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), productPackage_controller_1.createProductPackage);
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), productPackage_controller_1.updateProductPackage);
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), productPackage_controller_1.deleteProductPackage);
// Anyone logged in can see packages
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), productPackage_controller_1.getProductPackages);
//router.get("/", protect, getProductPackages);
router.get("/:id", auth_middleware_1.protect, productPackage_controller_1.getProductPackageById);
exports.default = router;
