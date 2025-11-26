// import express from "express";
// import { upload } from "../../mediaApi/services/multerConfig";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
// import {
//   createOurService,
//   getAllOurServices,
//   getOurServiceById,
//   updateOurService,
//   deleteOurService,
// } from "../controllers/ourservice.controller";

// const router = express.Router();

// // CREATE
// router.post(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   upload.single("imageUrl"),
//   createOurService
// );

// // GET ALL
// router.get("/", protect, getAllOurServices);

// // GET BY ID
// router.get("/:id", protect, getOurServiceById);

// // UPDATE
// router.put(
//   "/:id",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   upload.single("imageUrl"),
//   updateOurService
// );

// // DELETE
// router.delete(
//   "/:id",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   deleteOurService
// );

// export default router;

import express from "express";
import { upload } from "../../mediaApi/services/multerConfig";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";
import {
  createOurService,
  getAllOurServices,
  getOurServiceById,
  updateOurService,
  deleteOurService,
} from "../controllers/ourservice.controller";

const router = express.Router();

// CREATE → Admin / Superadmin
router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("imageUrl"),
  createOurService
);

// GET ALL → Admin + User
//router.get("/", protect, getAllOurServices);
router.get("/", protect,authorizeRole("admin", "superadmin", "user"), getAllOurServices);


// GET BY ID → Admin + User
router.get("/:id", protect, getOurServiceById);

// UPDATE → Admin / Superadmin
router.put(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  upload.single("imageUrl"),
  updateOurService
);

// DELETE → Admin / Superadmin
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  deleteOurService
);

export default router;
