"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../../userApi/middlewares/auth.middleware");
const authorizeRole_1 = require("../../userApi/middlewares/authorizeRole");
const router = (0, express_1.Router)();
// =======================
//  MULTER STORAGE
// =======================
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const folder = path_1.default.join(__dirname, "../../../../uploads/images");
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Multer upload
const upload = (0, multer_1.default)({ storage });
// =======================
//       ROUTES
// =======================
// ✔ Create product (image + icons)
router.post("/upload", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.fields([{ name: "image" }, { name: "icons" }]), product_controller_1.createProduct);
// ✔ Get All Products (only logged-in users)
//router.get("/", protect, getAllProducts);
router.get("/", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin", "user"), product_controller_1.getAllProducts);
// ✔ Get Single Product
router.get("/:id", auth_middleware_1.protect, product_controller_1.getProductById);
// ✔ Update Product
router.put("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), upload.fields([{ name: "image" }, { name: "icons" }]), product_controller_1.updateProduct);
// ✔ Delete Product
router.delete("/:id", auth_middleware_1.protect, (0, authorizeRole_1.authorizeRole)("admin", "superadmin"), product_controller_1.deleteProduct);
exports.default = router;
