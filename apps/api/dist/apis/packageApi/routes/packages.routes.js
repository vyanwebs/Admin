"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packages_controller_1 = require("../controllers/packages.controller");
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = express_1.default.Router();
// CREATE
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), packages_controller_1.createPackage);
// READ
//router.get("/", protect, getAllPackages);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), packages_controller_1.getAllPackages);
router.get("/:id", auth_middleware_1.protect, packages_controller_1.getPackageById);
// UPDATE
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("image"), packages_controller_1.updatePackage);
// DELETE
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), packages_controller_1.deletePackage);
exports.default = router;
