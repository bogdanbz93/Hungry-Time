import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="section section-img-wrapper light-bg">
        <div className="section-imgs">
          <img src={process.env.PUBLIC_URL + "/assets/img/megamenu.png"} alt="img" />
          <img src={process.env.PUBLIC_URL + "/assets/img/megamenu2.png"} alt="img" />
        </div>
        <div className="container">
          <div className="section-title-wrap text-left text-md-center">
            <h5 className="custom-primary">Ce facem la Hungry Time? 🤔</h5>
            <h2>Descoperim restaurante noi, împreună</h2>
            <p className="subtitle mx-auto">
              Zi de zi apar restaurante noi, poate chiar aproape de tine, poate chiar ai trecut pe lângă ele, dar nu le-ai observat. <br />
              De aceea suntem aici, să întâlnim noi experiențe.
            </p>
            <a href="/#cauta" className="btn-custom">
              {" "}
              Caută un restaurant <i className="fas fa-search ml-2"></i>{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
