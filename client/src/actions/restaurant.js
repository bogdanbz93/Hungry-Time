import axios from "axios";

export const createRestaurant = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-restaurant`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const allRestaurants = async () => await axios.get(`${process.env.REACT_APP_API}/restaurants`);

export const ownerRestaurant = async token =>
  await axios.get(`${process.env.REACT_APP_API}/owner-restaurant`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const deleteRestaurant = async (token, restaurantId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-restaurant/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const read = async restaurantId => await axios.get(`${process.env.REACT_APP_API}/restaurant/${restaurantId}`);

export const orders = async (token, id, restaurantId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/orders/${restaurantId}`,
    { id, restaurantId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const updateRestaurant = async (token, data, restaurantId) =>
  await axios.put(`${process.env.REACT_APP_API}/update-restaurant/${restaurantId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const detailsPlace = async placeId => {
  if (placeId !== "") {
    return await axios.post(`${process.env.REACT_APP_API}/placeId/${placeId}`);
  }
};

export const userRestaurantBookings = async token =>
  await axios.get(`${process.env.REACT_APP_API}/user-restaurant-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const searchListings = async query => await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);
