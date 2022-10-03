import express from "express";
import formidable from "express-formidable";

// Middleware
import { requireSignin, restaurantOwner } from "../middlewares";

// Controllers
import { create, restaurants, image, logo, ownerRestaurants, remove, read, update, detailsPlace, userRestaurantBookings, orders, searchListings } from "../controllers/restaurant";

const router = express.Router();

router.post("/create-restaurant", requireSignin, formidable(), create);
router.get("/restaurants", restaurants);
router.get("/restaurant/image/:restaurantId", image);
router.get("/restaurant/logo/:restaurantId", logo);
router.get("/owner-restaurant", requireSignin, ownerRestaurants);
router.delete("/delete-restaurant/:restaurantId", requireSignin, restaurantOwner, remove);
router.get("/restaurant/:restaurantId", read);
router.post("/orders/:restaurantId", requireSignin, orders);
router.post("/placeId/:placeId", detailsPlace);
router.put("/update-restaurant/:restaurantId", requireSignin, restaurantOwner, formidable(), update);
router.post("/search-listings", searchListings);

//orders
router.get("/user-restaurant-bookings", requireSignin, userRestaurantBookings);

module.exports = router;
