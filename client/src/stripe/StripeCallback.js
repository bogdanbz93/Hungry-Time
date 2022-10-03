import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import Notiflix from "notiflix-react";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  Notiflix.Loading.Pulse("Încărcăm datele tale din Stripe..");

  useEffect(() => {
    if (auth && auth.token) accountStatus();
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      console.log(res.data);
      updateUserInLocalStorage(res.data, () => {
        // redux update
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data
        });
        // redirect user to dashboard
        window.location.href = "/profile-listings";
      });
    } catch (err) {
      console.log(err);
    }
  };
  return null;
};

export default StripeCallback;
