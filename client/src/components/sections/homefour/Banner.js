import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";

const Banner = () => {
  const [location, setLocation] = useState("constanta");
  const [category, setCategory] = useState("fastfood");
  const { auth } = useSelector(state => ({ ...state }));

  const handleSubmit = e => {
    e.preventDefault();
    window.location.replace(`search-result?location=${location}&category=${category}`);
  };

  return (
    <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)", backgroundAttachment: "fixed" }}>
      <div className="container">
        <div className="banner-item">
          <div className="banner-inner">
            <div className="row">
              <div className="col-12 col-lg-5">
                <h1 className="title text-white text-md-center text-lg-left">
                  Restaurantul tău <u>preferat</u> este aici.
                </h1>
                <p className="text-white subtitle mb-4 text-left text-md-center text-lg-left">
                  <i className="fas fa-exclamation-circle mr-2"></i>Toate localurile listate respectă condițiile impuse de autorități împotriva noului Coronavirus{" "}
                  <a href="https://datelazi.ro/" target="_blank" rel="noreferrer">
                    COVID-19 <i className="far fa-question-circle"></i>
                  </a>
                  .
                </p>
                <div className="btn-group mb-5 d-flex justify-content-start justify-content-md-center justify-content-lg-start">
                  {auth && auth.user ? (
                    <>
                      <div className="row d-flex align-items-center d-md-none d-lg-flex">
                        <div className="col-3">
                          <Gravatar size={100} className="rounded-circle" email={auth.user.email} />
                        </div>
                        <div className="col-9">
                          <h5 className="text-light mb-0 text-light">Bine ai revenit, {auth.user.name}! 👋</h5>
                          <small className="text-light">Unde ai vrea să servești masa astăzi?</small>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn-custom primary">
                        Conectează-mă <i className="fas fa-long-arrow-alt-right ml-2" />{" "}
                      </Link>
                      <Link to="/register" className="btn-custom-2 light ml-3">
                        Înregistrare <i className="far fa-user ml-2" />{" "}
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="d-none d-lg-block col-7 p-0 mb-lg-n5 mt-lg-n5 text-right">
                <img className="mt-n5 mb-n5" src={process.env.PUBLIC_URL + "/assets/img/banner/ht_home_banner.png"} alt="banner_home" />
              </div>
            </div>
            <div className="acr-filter-form" id="cauta">
              <form>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control shadow-sm bg-light text-capitalize"
                        value={location}
                        onChange={e => {
                          setLocation(e.target.value);
                        }}
                      >
                        <option disabled hidden>
                          Oraș
                        </option>
                        <option className="text-capitalize">constanta</option>
                        <option className="text-capitalize">bucuresti</option>
                        <option className="text-capitalize">cluj</option>
                        <option className="text-capitalize">braila</option>
                        <option className="text-capitalize">timisoara</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control shadow-sm bg-light text-capitalize"
                        value={category}
                        onChange={e => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option disabled>Categorie</option>
                        <option className="text-capitalize">fastfood</option>
                        <option className="text-capitalize">italienesc</option>
                        <option className="text-capitalize">chinezesc</option>
                        <option className="text-capitalize">romanesc</option>
                        <option className="text-capitalize">turcesc</option>
                        <option className="text-capitalize">diversificat</option>
                      </select>
                    </div>
                  </div>
                  <div className="submit-btn col-lg-4 col-md-12">
                    <div className="form-group">
                      <button onClick={handleSubmit} className="btn-custom shadow btn-block w-100" name="button">
                        Caută restaurante <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
