"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = require("../../mediaApi/services/multerConfig");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const ourservice_controller_1 = require("../controllers/ourservice.controller");
const router = express_1.default.Router();
// CREATE → Admin / Superadmin
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("imageUrl"), ourservice_controller_1.createOurService);
// GET ALL → Admin + User
//router.get("/", protect, getAllOurServices);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), ourservice_controller_1.getAllOurServices);
// GET BY ID → Admin + User
router.get("/:id", auth_middleware_1.protect, ourservice_controller_1.getOurServiceById);
// UPDATE → Admin / Superadmin
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.upload.single("imageUrl"), ourservice_controller_1.updateOurService);
// DELETE → Admin / Superadmin
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), ourservice_controller_1.deleteOurService);
exports.default = router;
