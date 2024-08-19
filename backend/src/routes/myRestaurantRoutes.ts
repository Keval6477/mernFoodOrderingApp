import express from "express";
import multer from "multer";
import MyRestaturantController from "../controllers/MyRestaturantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //  5mb
  },
});

//get restaurant

router.get("/", jwtCheck, jwtParse, MyRestaturantController.getMyRestaurant);

// /api/my/res
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaturantController.createRestaurant
);

//update api
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaturantController.updateRestaurant
);

export default router;
