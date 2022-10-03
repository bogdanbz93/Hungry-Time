import React, { Component } from "react";

class Singleagent extends Component {
  render() {
    return (
      <div className="section mt-0 mb-3">
        <div className="container">
          <div className="acr-single-agent">
            <div className="acr-single-agent-thumb">
              <img src={process.env.PUBLIC_URL + "/assets/img/person.png"} alt="agent" />
              <div className="transparent-square">
                <div />
              </div>
            </div>
            <div className="acr-single-agent-body">
              <h3>Afli toate aplicațiile de curierat 🛵</h3>
              <p className="mb-4">Cu siguranță ai o preferință pentru o aplicație de curierat. Pe pagina unui restaurant îți vom lista toate platformele partenere ale acelui restaurant. Printr-un singur click, te vom redirecționa automat pe pagina de comandă și te vei putea bucura imediat de niște preparate foarte gustoase.</p>
              <div className="acr-single-agent-meta">
                <h6>Platforme de curierat disponibile:</h6>
              </div>
              <div className="acr-rating">
                <img className="mr-5 mt-n2" style={{ height: "25px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/glovo.svg"} alt="glovo" />
                <img className="mr-5" style={{ height: "26px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/foodpanda.svg"} alt="foodpanda" />
                <img style={{ height: "20px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/tazz.svg"} alt="tazz" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Singleagent;
