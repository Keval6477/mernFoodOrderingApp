import { Request, Response } from "express";
import userModel from "../model/userModel";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    // console.log(auth0Id);
    const existingUser = await userModel.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json({
        success: true,
      });
    }
    const newUser = new userModel(req.body);
    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: newUser.toObject(),
    });
  } catch (error) {
    console.log("Error creating current user=>", error);
    return res.status(500).json({
      success: false,
      message: "Error creating current user",
    });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    console.log("Error updating current user=>", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating current user",
    });
  }
};
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await userModel.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    return res.json(currentUser);
  } catch (error) {
    console.log("Error getting current user", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
