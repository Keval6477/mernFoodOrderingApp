import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "../src/routes/myUserRoutes";
import myRestaurantRoutes from "../src/routes/myRestaurantRoutes";
import restaurantRoutes from "../src/routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => console.log("database connection error=>", err));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoutes);
app.use("/api/my/restaurant", myRestaurantRoutes);
app.use("/api/restaurant", restaurantRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "hi",
  });
});

app.listen(7000, () => {
  console.log("listening on 7000");
});
