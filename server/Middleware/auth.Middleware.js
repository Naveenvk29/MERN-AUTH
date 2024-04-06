import jwt from "jsonwebtoken";
import asyncHandler from "../Utils/asyncHandler.js";
import User from "../Models/user.model.js";

const protect = asyncHandler(async (req, _, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoder.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
