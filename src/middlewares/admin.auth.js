import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken"

export const adminVerify = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    if (!user.role === "admin") {
      throw new ApiError(400, "Only Admin Authorized");
    }
    next()
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid Access Token");
  }
});
