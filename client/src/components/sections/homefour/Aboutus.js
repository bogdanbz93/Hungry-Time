import React, { Component } from "react";

class Aboutus extends Component {
  render() {
    return (
      <div className="section pt-0 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 acr-single-img-wrapper mb-lg-30">
              <div className="section-title-wrap section-header acr-dots-wrapper">
                <h5 className="text-primary">Ești deținătorul unui local? 😲</h5>
                <h2 className="font-weight-bold">Poate găsim niște clienți noi restaurantului, ce spui?</h2>
                <div className="acr-dots" />
              </div>
              <img className="shadow-lg" src={process.env.PUBLIC_URL + "/assets/img/about/2.jpg"} alt="listing" />
            </div>
            <div className="col-lg-6 acr-single-img-wrapper">
              <div className="section-title-wrap mt-lg-4">
                <img className="shadow-lg" src={process.env.PUBLIC_URL + "/assets/img/about/1.jpg"} alt="listing" />
                <p className="subtitle">Listează în câțiva pași simpli restaurantul tău. Nimeni nu dorește să caute în mai multe pagini toate informațiile restaurantului tău. Cu toții ne dorim să nu pierdem timpul.</p>
                <p>Ei bine, fă un rezumat al restaurantului tău, publică detaliile de contact, imagini și meniul pe care clienții tăi îl pot scana de la fiecare masă. Acesta ți se va genera automat.</p>
                <a href="/#cauta" className="btn-link custom-primary">
                  Caută un restaurant pentru a vedea procedeul <i className="fas fa-arrow-up" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Aboutus;
