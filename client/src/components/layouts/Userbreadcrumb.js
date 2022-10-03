import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import Notiflix from "notiflix-react";
import moment from "moment";
import "moment/locale/ro";

const Userbreadcrumb = () => {
  // Aducem state-ul + Dispatch
  const { auth } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  // Logout
  const logout = () => {
    Notiflix.Confirm.Show("Confirmare", "Ești sigur că vrei să ieși din contul tău?", "Da", "Nu", function () {
      dispatch({
        type: "LOGOUT",
        payload: null
      });
      window.localStorage.removeItem("auth");
      window.localStorage.setItem("confirmLogout", "confirmLogout");
      window.location.replace("/login");
    });
  };

  // Joined time
  moment.locale("ro");

  return (
    <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}>
      <div className="container">
        <div className="media p-5">
          <Gravatar email={auth.user.email} size={100} rating="pg" className="rounded-circle shadow-lg" />
          <div className="media-body">
            {auth && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? (
              <>
                <span className="badge badge-pill badge-light text-dark py-0 px-2 mb-2">
                  <i className="far fa-building mr-1"></i> Proprietar de restaurant
                </span>
              </>
            ) : (
              <>
                <span className="badge badge-pill badge-light text-dark py-0 px-2 mb-2">
                  <i className="far fa-user-circle mr-1"></i> Client
                </span>
              </>
            )}

            <h4 className="text-white mb-2">
              Bine ai revenit, <u>{auth.user.name}</u>! 👋
            </h4>

            <span className="badge badge-pill border text-light py-0 px-2" style={{ fontWeight: "initial" }}>
              <i className="far fa-clock mr-1" />
              Te-ai alăturat pe platformă cu <b>{moment(auth.user.createdAt).fromNow()}</b>.
            </span>
          </div>
          <div className="text-right">
            <span className="user-email mb-2 small">
              <i className="far fa-envelope-open mr-1" /> {auth.user.email}
            </span>
            <br />
            <button onClick={logout} className="btn-custom danger mt-2 align-selft-right w-100">
              Deconectează-mă <i className="fas fa-sign-out-alt ml-2 mr-0" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userbreadcrumb;
