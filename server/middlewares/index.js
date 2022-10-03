import expressJwt from "express-jwt";
import Restaurant from "../models/restaurant";

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
});

export const restaurantOwner = async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
  let owner = restaurant.postedBy._id.toString() === req.user._id.toString();
  if (!owner) return res.status(403).send("Această opțiune este neautorizată în acest caz.");
  next();
};
