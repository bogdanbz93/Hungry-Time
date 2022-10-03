import axios from "axios";

export const register = async user => await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async user => await axios.post(`${process.env.REACT_APP_API}/login`, user);

export const googleLogin = async user => await axios.post(`${process.env.REACT_APP_API}/googleLogin`, user);

export const updateProfile = async user => await axios.post(`${process.env.REACT_APP_API}/update_profile`, user);

export const deleteAccount = async user => await axios.post(`${process.env.REACT_APP_API}/delete_account`, user);

export const confirmAccount = async token => await await axios.get(`${process.env.REACT_APP_API}/confirmation/${token}`);

// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
