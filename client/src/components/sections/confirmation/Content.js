import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { confirmAccount } from "../../../actions/auth";

const Content = () => {
  const urlPath = useLocation();
  const token = urlPath.pathname.substring(14);
  console.log(token);

  useEffect(() => {
    confirmEmail();
  }, []);

  const confirmEmail = async () => {
    let res = await confirmAccount(token);
    if (res)
      setTimeout(function () {
        window.location.replace("/login");
      }, 10000);
  };

  return (
    <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)" }}>
      <div className="container">
        <div className="section-200 py-0">
          <div className="section-200-text mb-0">
            <div className="mx-auto" style={{ maxWidth: "465px" }}>
              <img className="img-fluid mx-auto text-center" src={process.env.PUBLIC_URL + "/assets/img/email_verified.svg"} alt="success" />
            </div>

            <h1 className="title mt-5">
              Email-ul a fost <u>verificat</u>!
            </h1>
            <p className="subtitle">
              Îți mulțumim! 🥳 Ai fost înregistrat cu succes în aplicația Hungry Time. Acum te poți loga pentru a beneficia de toate opțiunile platformei noastre. Te vom redirecționa automat. <br />
              <span className="spinner-border spinner-border-sm mt-3 text-dark" role="status" aria-hidden="true"></span>
              <span className="sr-only">Loading...</span>
            </p>
            <a href="/login" className="btn-custom secondary text-dark">
              Către pagina de login <i className="fas fa-arrow-right"></i>
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
