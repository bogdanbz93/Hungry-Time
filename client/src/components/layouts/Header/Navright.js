import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Notiflix from "notiflix-react";
import Gravatar from "react-gravatar";

const Navright = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
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

  return (
    <ul className="header-controls-inner d-none d-lg-flex">
      <li>
        {/* Not logged */}
        {auth === null && (
          <>
            <a href="/login" className="btn-custom primary">
              Intră în cont <i className="fas fa-plus" />{" "}
            </a>
          </>
        )}

        {/* If logged */}
        {auth !== null && (
          <>
            <button onClick={logout} className="btn-custom-2 light-grey mr-4">
              Logout <i className="fas fa-sign-out-alt ml-2" />{" "}
            </button>
          </>
        )}
      </li>
      {auth !== null && (
        <span className="position-relative">
          <a href="/profile">
            <Gravatar email={auth.user.email} size={50} rating="pg" default="monsterid" className="rounded-circle" />
            <div className="overlayGravatar shadow">
              <div className="textGravatar">
                <i className="far fa-user" />
              </div>
            </div>
          </a>
        </span>
      )}
    </ul>
  );
};

export default Navright;
