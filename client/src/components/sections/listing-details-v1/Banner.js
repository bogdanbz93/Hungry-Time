import React from "react";
import { Link } from "react-router-dom";

const bannerpost = [
  {
    img: "/assets/img/listing-single/1.jpg"
  },
  {
    img: "/assets/img/listing-single/1-2.jpg"
  }
];

const Banner = () => {
  return (
    <div className="banner banner-2 p-0">
      <div className="banner-item">
        <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + bannerpost[0].img + ")" }} />
        <div className="acr-listing-details">
          <div className="acr-listing-section">
            <div className="acr-listing-nav">
              <Link to="#" className="btn-custom secondary">
                Print Listing
              </Link>
            </div>
            <div className="acr-listing-section-body">
              <div className="acr-listing-section-price">
                <span>For Sale</span>
                <h3>$852,000</h3>
                <span>Est. Mortgage</span>
                <p>$1,300/mo</p>
              </div>
            </div>
          </div>
          <div className="acr-listing-section">
            <div className="acr-listing-section-body">
              <h4> Iris Watson, Frederick Nebraska 20620</h4>
              <div className="acr-listing-icons">
                <div className="acr-listing-icon">
                  <i className="flaticon-bedroom" />
                  <span>Beds</span>
                  <span className="acr-listing-icon-value">3</span>
                </div>
                <div className="acr-listing-icon">
                  <i className="flaticon-bathroom" />
                  <span>Baths</span>
                  <span className="acr-listing-icon-value">2</span>
                </div>
                <div className="acr-listing-icon">
                  <i className="flaticon-ruler" />
                  <span>Sqft</span>
                  <span className="acr-listing-icon-value">2,499</span>
                </div>
              </div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
            </div>
          </div>
          <div className="acr-listing-section">
            <div className="acr-listing-controls">
              <Link to="#" className="acr-listing-control">
                <i className="flaticon-share" />
              </Link>
              <Link to="#" className="acr-listing-control">
                <i className="flaticon-star" />
              </Link>
              <Link to="#" className="acr-schedule-tour acr-listing-control">
                <i className="flaticon-event" />
                <span>Schedule Link tour</span>
              </Link>
            </div>
            <div className="acr-listing-section-body">
              <div className="acr-listing-meta">
                <div className="row">
                  <div className="col-lg-6 col-md-3 col-sm-3">
                    <div className="acr-listing-meta-item">
                      <span>Type</span>
                      <p>House</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-3 col-sm-3">
                    <div className="acr-listing-meta-item">
                      <span>View</span>
                      <p>City View</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-3 col-sm-3">
                    <div className="acr-listing-meta-item">
                      <span>Lot Size</span>
                      <p>89 Acres</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-3 col-sm-3">
                    <div className="acr-listing-meta-item">
                      <span>Condition</span>
                      <p>Brand New</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
