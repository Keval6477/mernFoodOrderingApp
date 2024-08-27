import express from "express";
import { param } from "express-validator";
import Retauratcontroller from "../controllers/Retauratcontroller";

const router = express.Router();

//api/restaurannt/search/rajkot
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  Retauratcontroller.searchRestaurant
);

router.get("/:restaurantId",param("restaurantId")
.isString()
.trim()
.notEmpty()
.withMessage("RestaurantId parameter must be a string"),Retauratcontroller.getRestaurant)

export default router;
