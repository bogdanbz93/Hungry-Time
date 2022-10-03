import axios from "axios";

export const createConnectAccount = async token =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getAccountStatus = async token =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getAccountBalance = async token =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const currencyFormater = data => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency
  });
};

export const payoutSetting = async token =>
  axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getSessionId = async (token, restaurantId, date, hours, chairs) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { restaurantId, date, hours, chairs },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const stripeSuccessRequest = async (token, restaurantId, bookingDate, bookingHour, bookingChairs, bookingPhone) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { restaurantId, bookingDate, bookingHour, bookingChairs, bookingPhone },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
