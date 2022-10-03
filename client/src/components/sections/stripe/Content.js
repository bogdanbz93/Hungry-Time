import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { stripeSuccessRequest } from "../../../actions/stripe";
import { updateUserInLocalStorage } from "../../../actions/auth";

const Content = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const urlPath = useLocation();
  const restaurantId = urlPath.pathname.substring(16);
  const dispatch = useDispatch();
  const bookingDate = auth.user.booking.date;
  const bookingHour = auth.user.booking.hour;
  const bookingChairs = auth.user.booking.chairs;
  const bookingPhone = auth.user.booking.phone;

  useEffect(() => {
    stripeSuccessRequest(auth.token, restaurantId, bookingDate, bookingHour, bookingChairs, bookingPhone).then(res => {
      if (res.data.success) console.log("stripe success response", res.data);
      else window.location.replace("/stripe/cancel");
      // Ștergem rezervarea din state si redux
      let newAuth = { ...auth.user };
      newAuth.booking.date = "";
      newAuth.booking.hour = "";
      newAuth.booking.chairs = "";
      newAuth.booking.phone = "";
      updateUserInLocalStorage(newAuth, () => {
        // redux update
        dispatch({
          type: "LOGGED_IN_USER",
          payload: newAuth
        });
      });
    });
  }, [restaurantId]);

  return (
    <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)" }}>
      <div className="container">
        <div className="section-200 py-0">
          <div className="section-200-text mb-0">
            <div className="mx-auto" style={{ maxWidth: "465px" }}>
              <img className="img-fluid mx-auto text-center" src={process.env.PUBLIC_URL + "/assets/img/listings/success_payment.svg"} alt="success" />
            </div>

            <h1 className="title mt-5">
              Plată efectuată cu <u>succes</u>!
            </h1>
            <p className="subtitle">
              Îți mulțumim, <b>{auth.user.name}</b>! 🥳 Am înregistrat comanda ta și deja ne pregătim pentru venirea ta în restaurant. Dacă apar probleme, te vom contacta imediat.
            </p>
            <a href="/" className="btn-custom secondary text-dark">
              Înapoi pe prima pagină <i className="fas fa-home"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="acr-clouds">
        <div className="cloud-one" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud1.png)" }} />
        <div className="cloud-two" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud2.png)" }} />
        <div className="cloud-three" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud3.png)" }} />
        <div className="cloud-four" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud4.png)" }} />
        <div className="cloud-five" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud5.png)" }} />
      </div>
    </div>
  );
};

export default Content;
