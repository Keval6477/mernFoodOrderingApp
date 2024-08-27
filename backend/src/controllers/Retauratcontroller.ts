import { Request, Response } from "express";
import Restaurant from "../model/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisine = (req.query.selectedCuisine as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res
        .status(404)
        .json({ data: [], pagination: { total: 0, page: 1, pages: 1 } });
    }
    if (selectedCuisine) {
      const cuisineArray = selectedCuisine
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisine"] = { $all: cuisineArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);
    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.json(response);
  } catch (error) {
    console.log("search api error: " + error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found." });
    }
    return res.json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
export default {
  searchRestaurant,
  getRestaurant,
};
