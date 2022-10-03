import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Covidstats from "./Covidstats";

const Footercontent = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 footer-widget">
            <div className="footer-logo">
              <img src={process.env.PUBLIC_URL + "/assets/img/logo-white.svg"} alt="hungrytime" />
            </div>
            <p>Hungry Time este o platformă pentru digitalizarea restaurantelor. Este un răspuns pentru situația economică generată de perioada epidemiologică.</p>
            <button onClick={scrollToTop} className="btn bg-transparent border rounded-lg px-3 py-2">
              <i className="fas fa-arrow-up text-light"></i>
            </button>
          </div>
          <div className="col-lg-4 offset-md-1 col-md-5 col-sm-6 footer-widget">
            <h5 className="widget-title">Rețele sociale</h5>
            <ul className="social-media">
              <li>
                {" "}
                <Link to="#">
                  {" "}
                  <i className="fab fa-facebook-f" />{" "}
                </Link>{" "}
              </li>
              <li>
                {" "}
                <a href="https://instagram.com/hungrytimero" target="_blank" rel="noreferrer">
                  {" "}
                  <i className="fab fa-instagram" />{" "}
                </a>{" "}
              </li>
            </ul>

            <h5 className="widget-title mt-4 mb-1">Cazuri noi confirmate COVID-19</h5>
            <p className="pr-lg-5">Noile cazuri confirmate în ultimele 24 de ore.</p>
            <Covidstats />
          </div>
          <div className="col-lg-4 col-md-12 footer-widget">
            <h5 className="widget-title">Metodă de plată online</h5>
            <p>Milioane de întreprinderi de toate mărimile - de la startup-uri la întreprinderi mari - folosesc software-ul și API-urile Stripe pentru a accepta plăți, a trimite plăți și a-și gestiona afacerile online.</p>
            <a href="https://stripe.com/" target="_blank" rel="noreferrer">
              <img style={{ maxWidth: "450px" }} src={process.env.PUBLIC_URL + "/assets/img/footer/cards_stripe_payments.svg"} alt="stripe" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="m-0">
                © Sesiunea de licență 2021{" "}
                <a className="text-light" href="https://fmi.univ-ovidius.ro/" target="_blank" rel="noreferrer">
                  Universitatea "Ovidius", Constanța
                </a>{" "}
                - Hungry Time creat de <b>Buzea Bogdan.</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footercontent;
