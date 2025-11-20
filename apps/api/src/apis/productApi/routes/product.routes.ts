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

const router = Router();

// =======================
//  MULTER STORAGE (FINAL)
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✔ Image + Icons both go to uploads/images
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icons", maxCount: 20 },
  ]),
  createProduct
);

// ✔ Get All
router.get("/", getAllProducts);

// ✔ Get One
router.get("/:id", getProductById);

// ✔ Update (can update image/icons)
router.put(
  "/:id",
  upload.fields([
    { name: "image" },
    { name: "icons" },
  ]),
  updateProduct
);

// ✔ Delete
router.delete("/:id", deleteProduct);

export default router;
