import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = Router();

// =======================
//  MULTER STORAGE
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../../../../uploads/images");
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer upload
const upload = multer({ storage });

// =======================
//       ROUTES
// =======================

// ✔ Create product (image + icons)
router.post(
  "/upload",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.fields([{ name: "image" }, { name: "icons" }]),
  createProduct
);

// ✔ Get All Products (only logged-in users)
//router.get("/", protect, getAllProducts);
router.get(
  "/",
  protect,
  authorizeRole("admin", "superadmin", "user"),
  getAllProducts
);

// ✔ Get Single Product
router.get("/:id", protect, getProductById);

// ✔ Update Product
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.fields([{ name: "image" }, { name: "icons" }]),
  updateProduct
);

// ✔ Delete Product
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteProduct
);

export default router;
