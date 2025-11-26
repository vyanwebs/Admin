// import { Router } from "express";
// import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
// import { upload } from "../../mediaApi/services/multerConfig"; // existing multer

// const router = Router();

// // POST route (form-data text-only)
// router.post("/", upload.none(), createOrUpdateAboutUs);

// // GET route
// router.get("/", getAboutUs);

// export default router;


import { Router } from "express";
import { createOrUpdateAboutUs, getAboutUs } from "../controllers/aboutUs.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { upload } from "../../mediaApi/services/multerConfig";

const router = Router();

router.post(
  "/",
  protect,           
  upload.none(),     
  createOrUpdateAboutUs
);
router.get("/", getAboutUs);

export default router;
