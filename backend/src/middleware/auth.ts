import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
const { auth } = require("express-oauth2-jwt-bearer");

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: "mern-food-odering-app-api",
  issuerBaseURL: "https://dev-fmuonyx3aocc534h.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await userModel.findOne({ auth0Id: auth0Id });
   // console.log(user);
    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user?._id.toString();
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
