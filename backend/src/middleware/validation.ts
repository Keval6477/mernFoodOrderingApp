import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant Name must be a string"),
  body("city").notEmpty().withMessage("city Name must be a string"),
  body("country").notEmpty().withMessage("country Name must be a string"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery must be a number"),
  body("estimatedDeliveryTime")
    .isFloat({ min: 0 })
    .withMessage("Estimated delivery time must be a integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be a array")
    .not()
    .isEmpty()
    .withMessage("Cuisines can not be a empty"),
  body("menuItems").isArray().withMessage("Menu items must be array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item Price is required"),
  handleValidationErrors,
];
