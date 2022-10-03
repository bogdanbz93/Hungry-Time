import React, { Component } from "react";

class Location extends Component {
  render() {
    return (
      <div className="section section-padding bg-norepeat bg-bottom pt-0" style={{ backgroundImage: 'url("assets/img/misc/bldg.png")' }}>
        <div className="container">
          <div className="section-title-wrap section-header">
            <h5 className="custom-primary">Găsește locul tău preferat</h5>
            <h2>Caută în funcție de oraș 🔍</h2>
          </div>
          <div className="row masonry">
            <div className="col-lg-6 masonry-item">
              <div className="acr-country-item acr-country-item-lg">
                <div className="acr-country-thumb">
                  <img src={process.env.PUBLIC_URL + "/assets/img/countries/1.jpg"} alt="country" />
                </div>
                <a href="/search-result?location=constanta" className="acr-country-content">
                  <h4>Constanța</h4>
                  <span>E momentul să vizitezi marea din nou 🌊</span>
                </a>
              </div>
            </div>
            <div className="col-lg-6 masonry-item">
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <div className="acr-country-item">
                    <div className="acr-country-thumb">
                      <img src={process.env.PUBLIC_URL + "/assets/img/countries/2.jpg"} alt="country" />
                    </div>
                    <a href="/search-result?location=bucuresti" className="acr-country-content">
                      <h6>București</h6>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="acr-country-item">
                    <div className="acr-country-thumb">
                      <img src={process.env.PUBLIC_URL + "/assets/img/countries/3.jpg"} alt="country" />
                    </div>
                    <a href="/search-result?location=timisoara" className="acr-country-content">
                      <h6>Timișoara</h6>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="acr-country-item">
                    <div className="acr-country-thumb">
                      <img src={process.env.PUBLIC_URL + "/assets/img/countries/4.jpg"} alt="country" />
                    </div>
                    <a href="/search-result?location=cluj" className="acr-country-content">
                      <h6>Cluj-Napoca</h6>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="acr-country-item">
                    <div className="acr-country-thumb">
                      <img src={process.env.PUBLIC_URL + "/assets/img/countries/5.jpg"} alt="country" />
                    </div>
                    <a href="/search-result?location=braila" className="acr-country-content">
                      <h6>Brăila</h6>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
