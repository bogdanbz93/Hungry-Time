import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";

class Gallery extends Component {
  componentDidMount() {
    function popup() {
      $(".gallery-thumb").magnificPopup({
        type: "image",
        gallery: {
          enabled: true
        }
      });
    }
    popup();
  }
  render() {
    return (
      <div className="section section-padding">
        <div className="container">
          <div className="section-title-wrap section-header">
            <h5 className="custom-primary">Galerie</h5>
            <h2 className="title">Aplicația noastră, în poze</h2>
          </div>
          <div className="row gallery">
            <div className="col-lg-6">
              <Link to="assets/img/services/1.jpg" className="gallery-thumb">
                <img src={process.env.PUBLIC_URL + "/assets/img/services/1.jpg"} alt="services" />
                <p className="gallery-caption">
                  Codul QR al unui restaurant <i className="fas fa-qrcode ml-2"></i>
                </p>
              </Link>
            </div>
            <div className="col-lg-6">
              <Link to="assets/img/services/2.jpg" className="gallery-thumb">
                <img src={process.env.PUBLIC_URL + "/assets/img/services/2.jpg"} alt="services" />
                <p className="gallery-caption">
                  Versiune desktop <i className="fas fa-desktop ml-2"></i>
                </p>
              </Link>
              <Link to="assets/img/services/3.jpg" className="gallery-thumb">
                <img src={process.env.PUBLIC_URL + "/assets/img/services/3.jpg"} alt="services" />
                <p className="gallery-caption">
                  Versiune mobile <i className="fas fa-mobile-alt ml-2"></i>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
