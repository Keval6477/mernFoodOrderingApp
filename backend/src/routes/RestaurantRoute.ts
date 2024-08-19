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

export default router;
