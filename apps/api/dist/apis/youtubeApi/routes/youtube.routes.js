"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_controllers_1 = require("../controllers/youtube.controllers");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const multerConfig_1 = __importDefault(require("../../mediaApi/services/multerConfig"));
const router = express_1.default.Router();
// CREATE (Admin Only)
router.post("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.default.single("video"), youtube_controllers_1.createYoutubeVideo);
// GET ALL — PUBLIC (FINAL OPTION 1)
//router.get("/", getAllYoutubeVideos);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), youtube_controllers_1.getAllYoutubeVideos);
// GET BY ID — PUBLIC
router.get("/:id", youtube_controllers_1.getYoutubeVideoById);
// GET BY DATE — PUBLIC
router.get("/date/:date", youtube_controllers_1.getYoutubeVideosByDate);
// UPDATE (Admin Only)
router.patch("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), multerConfig_1.default.single("video"), youtube_controllers_1.updateYoutubeVideo);
// DELETE (Admin Only)
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), youtube_controllers_1.deleteYoutubeVideo);
exports.default = router;
