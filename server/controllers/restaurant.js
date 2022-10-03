import Restaurant from "../models/restaurant";
import Order from "../models/order";
import fs from "fs";
import fetch from "node-fetch";

export const create = async (req, res) => {
  console.log("req.fields: ", req.fields);
  console.log("req.files: ", req.files);

  try {
    let fields = req.fields;
    let files = req.files;

    let restaurant = new Restaurant(fields);
    restaurant.postedBy = req.user._id;

    // handle images
    if (files.image) {
      restaurant.image.data = fs.readFileSync(files.image.path);
      restaurant.image.contentType = files.image.type;
    }

    if (files.logo) {
      restaurant.logo.data = fs.readFileSync(files.logo.path);
      restaurant.logo.contentType = files.logo.type;
    }

    if (req.fields.title === "" || req.fields.content === "" || req.fields.category === "" || req.fields.location === "" || req.fields.price === "" || req.fields.phone === "" || req.fields.lat === "" || req.fields.lng === "" || req.fields.tables === "" || req.fields.drinksMenu === '[{"drinkName":"","drinkPrice":"","drinkDetails":""}]' || req.fields.foodMenu === '[{"foodName":"","foodPrice":"","foodDetails":""}]') {
      res.status(400).send("A fost o eroare la înscriererea acestui restaurant în platformă. Asigurați-vă că toate câmpurile sunt completate corect.");
    } else
      restaurant.save((err, result) => {
        if (err) {
          console.log("saving restaurant error: ", err);
          res.status(400).send("A fost o eroare la înscriererea acestui restaurant în platformă. Asigurați-vă că toate câmpurile sunt completate corect.");
        }
        res.json(result);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};

export const restaurants = async (req, res) => {
  let all = await Restaurant.find({}).sort({ createdAt: "descending" }).limit(24).select("-image.data").populate("postedBy", "_id name email").exec();
  res.json(all);
};

export const image = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
  if (restaurant && restaurant.image && restaurant.image.data !== null) {
    res.set("Content-Type", restaurant.image.contentType);
    return res.send(restaurant.image.data);
  }
};

export const logo = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
  if (restaurant && restaurant.logo && restaurant.logo.data !== null) {
    res.set("Content-Type", restaurant.logo.contentType);
    return res.send(restaurant.logo.data);
  }
};

export const ownerRestaurants = async (req, res) => {
  let all = await Restaurant.find({ postedBy: req.user._id }).select("-image.data -logo.data").populate("postedBy", "_id name email").exec();
  res.send(all);
};

export const orders = async (req, res) => {
  let counter = 0;
  const order = await Order.find({ restaurant: req.body.restaurantId }).sort({ createdAt: "descending" }).populate("restaurant", "-image.data -logo.data -drinksMenu -foodMenu -ytVideo").populate("orderedBy", "_id name").exec();
  order.map((item, i) => {
    if (item.restaurant.postedBy != req.body.id) {
      counter = counter + 1;
    }
  });
  if (counter === 0) res.send(order);
};

export const remove = async (req, res) => {
  let removed = await Restaurant.findByIdAndDelete(req.params.restaurantId).select("-image.data -logo.data").exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId).select("-image.data -logo.data").populate("postedBy", "_id name email").exec();
  res.json(restaurant);
};

export const detailsPlace = async (req, res) => {
  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeId}&key=AIzaSyDJq5WnRoo3R6Uo72nzuz6RtIX1mp-dn0g`)
    .then(res => res.json())
    .then(json => res.json(json));
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      data.image = image;
    }

    if (files.logo) {
      let logo = {};
      logo.data = fs.readFileSync(files.logo.path);
      logo.contentType = files.logo.type;
      data.logo = logo;
    }

    let updated = await Restaurant.findByIdAndUpdate(req.params.restaurantId, data, { new: true }).select("-image.data");

    res.json(updated);
  } catch {
    console.log(err);
    res.status(400).send("Din păcate nu am reușit să modificăm restaurantul. Încercați din nou.");
  }
};

export const userRestaurantBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id }).sort({ createdAt: "descending" }).populate("restaurant", "-image.data -logo.data -drinksMenu -foodMenu -ytVideo").populate("orderedBy", "_id name").exec();
  res.json(all);
};

export const searchListings = async (req, res) => {
  const { location, category } = req.body;
  if (category) {
    let result = await Restaurant.find({ city: location, category: category }).sort({ createdAt: "descending" }).select("-image.data -logo.data").populate("postedBy", "_id name email").exec();
    res.json(result);
  } else {
    let result = await Restaurant.find({ city: location }).sort({ createdAt: "descending" }).select("-image.data -logo.data").populate("postedBy", "_id name email").exec();
    res.json(result);
  }
};
