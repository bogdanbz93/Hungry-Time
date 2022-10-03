import React, { Component } from "react";
import { Link } from "react-router-dom";

class Video extends Component {
  render() {
    return (
      <div className="section section-img-wrapper light-bg">
        <div className="section-imgs">
          <img src={process.env.PUBLIC_URL + "/assets/img/megamenu.png"} alt="img" />
          <img src={process.env.PUBLIC_URL + "/assets/img/megamenu2.png"} alt="img" />
        </div>
        <div className="container">
          <div className="section-title-wrap text-center">
            <h5 className="custom-primary">Ce facem la Hungry Time? 🤔</h5>
            <h2 className="h1 font-weight-bold">Descoperim restaurante noi, împreună</h2>
            <p className="subtitle">
              Zi de zi apar restaurante noi, poate chiar aproape de tine, poate chiar ai trecut pe lângă ele, dar nu le-ai observat. <br />
              De aceea suntem aici, să întâlnim noi experiențe.
            </p>
            <Link to="/profile" className="btn-custom">
              {" "}
              Completează profilul tău <i className="fas fa-long-arrow-alt-right ml-2"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
