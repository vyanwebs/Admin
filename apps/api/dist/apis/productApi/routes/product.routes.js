"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
// ✅ Multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === "icons"
            ? path_1.default.join(__dirname, "../../../../uploads/icons")
            : path_1.default.join(__dirname, "../../../../uploads/images");
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// ✅ Routes
router.post("/upload", upload.fields([
    { name: "image" },
    { name: "icons" },
]), product_controller_1.createProduct);
router.get("/", product_controller_1.getAllProducts);
router.get("/:id", product_controller_1.getProductById);
router.put("/:id", upload.single("image"), product_controller_1.updateProduct);
router.delete("/:id", product_controller_1.deleteProduct);
exports.default = router;
