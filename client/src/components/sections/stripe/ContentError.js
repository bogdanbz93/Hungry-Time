import React from "react";
import { useSelector } from "react-redux";

const Content = () => {
  const { auth } = useSelector(state => ({ ...state }));

  return (
    <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)" }}>
      <div className="container">
        <div className="section-200 py-0">
          <div className="section-200-text mb-0">
            <div className="mx-auto" style={{ maxWidth: "300px" }}>
              <img className="img-fluid" src={process.env.PUBLIC_URL + "/assets/img/listings/cancel_payment.svg"} alt="testimonial" />
            </div>
            <h1 className="title mt-5">
              Plată <span className="custom-danger">eșuată</span>!
            </h1>
            <p className="subtitle">
              Ne pare rău, <b>{auth.user.name}</b>! 😭 Din păcate a intervenit o problemă cu plata acestei rezervări. Te rugăm să încerci din nou.
            </p>
            <a href="/" className="btn-custom danger">
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
