// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { upload } from "../../mediaApi/services/multerConfig";

// const router = Router();
// router.post("/", upload.none(), createOrUpdatePrivacy);
// router.get("/", getPrivacy);

// // export default router;
// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { upload } from "../../mediaApi/services/multerConfig";
// import { protect } from "../../userApi/middlewares/auth.middleware";

// const router = Router();

// router.post("/", protect, upload.none(), createOrUpdatePrivacy);
// router.get("/", getPrivacy);

// export default router;



// import { Router } from "express";
// import { createOrUpdatePrivacy, getPrivacy } from "../controllers/privacyPolicy.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

// const router = Router();

// // router.post("/", createOrUpdatePrivacy);
// //router.get("/", protect, getPrivacy);

// router.post(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin"),
//   createOrUpdatePrivacy
// );


// router.get(
//   "/",
//   protect,
//   authorizeRole("admin", "superadmin","user"),
//   getPrivacy
// );

// export default router;



// import { Router } from "express";
// import { getPrivacy, createOrUpdatePrivacyMiddleware } from "../controllers/privacyPolicy.controller";
// import { protect } from "../../userApi/middlewares/auth.middleware";
// import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

// const router = Router();

// // POST (admin + superadmin only)
// router.post(
// "/",
// protect,
// authorizeRole("admin", "superadmin"),
// createOrUpdatePrivacyMiddleware
// );

// // GET (admin, superadmin, user)
// router.get(
// "/",
// protect,
// authorizeRole("admin", "superadmin", "user"),
// getPrivacy
// );

// export default router;


import { Router } from "express";
import { getPrivacy, createOrUpdatePrivacyMiddleware } from "../controllers/privacyPolicy.controller";
import { protect } from "../../userApi/middlewares/auth.middleware";
import { authorizeRole } from "../../userApi/middlewares/authorizeRole";

const router = Router();

// POST - Create/Update (admin + superadmin only)
router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  createOrUpdatePrivacyMiddleware
);

// GET - Fetch Privacy Policy (all roles)
router.get(
  "/",
  protect,
  authorizeRole("admin", "superadmin", "user"),
  getPrivacy
);

export default router;
