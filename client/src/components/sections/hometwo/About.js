import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-lg-30 acr-dots-wrapper acr-single-img-wrapper">
              <img className="shadow-lg" src={process.env.PUBLIC_URL + "/assets/img/listings-list/3.jpg"} alt="img" />
              <div className="acr-dots" />
            </div>
            <div className="col-lg-6">
              <div className="section-title-wrap mr-lg-30">
                <h5 className="custom-primary">Cu ce ne ocupăm?</h5>
                <h2 className="title">Aducem restaurantele mai aproape de tine</h2>
                <p className="subtitle">Listează în câțiva pași simpli restaurantul tău. Nimeni nu dorește să caute în mai multe pagini toate informațiile restaurantului tău. Cu toții ne dorim să nu pierdem timpul. Ei bine, fă un rezumat al restaurantului tău, publică detaliile de contact, imagini și meniul pe care clienții tăi îl pot scana de la fiecare masă. Acesta ți se va genera automat.</p>
                <p className="subtitle">Zi de zi apar restaurante noi, poate chiar aproape de tine, poate chiar ai trecut pe lângă ele, dar nu le-ai observat. De aceea suntem aici, să întâlnim noi experiențe.</p>
                <a href="/#cauta" className="btn-custom">
                  Caută restaurante <i className="fas fa-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
