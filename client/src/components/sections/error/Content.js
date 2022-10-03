import React, { Component } from "react";

class Content extends Component {
  render() {
    return (
      <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)" }}>
        <div className="container">
          <div className="section-404 text-center">
            <div className="mx-auto" style={{ maxWidth: "465px" }}>
              <img className="img-fluid mx-auto text-center" src={process.env.PUBLIC_URL + "/assets/img/404.svg"} alt="error" />
            </div>
            <div className="section-404-text mb-0">
              <h1 className="title mt-4">Nu am găsit ceea ce cauți.</h1>
              <p className="subtitle">Din păcate pagina pe care ai intrat nu există în realitate. Întoarce-te acasă, cred că ești mult mai în siguranță acolo.</p>
              <a href="/" className="btn-custom">
                Înapoi pe prima pagină
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
  }
}

export default Content;
