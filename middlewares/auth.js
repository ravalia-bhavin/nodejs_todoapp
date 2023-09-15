import { User } from "../models/user.js"; // add `.js`
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  // get decodedData
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // get id from the decodedData
  req.user = await User.findById(decoded._id);

  next();
};
