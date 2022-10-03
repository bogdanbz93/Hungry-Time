import React, { Component } from "react";

const counter = [
  {
    value: 15,
    title: "Listări"
  },
  {
    value: 130,
    title: "Utilizatori"
  },
  {
    value: 50,
    title: "Restaurante"
  },
  {
    value: 325,
    title: "Rezervări"
  }
];

class Counter extends Component {
  render() {
    return (
      <div className="section section-padding bg-cover bg-center bg-parallax dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)" }}>
        <div className="container">
          <div className="row">
            {counter.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                <div className="acr-infographic-item">
                  <h4>{new Intl.NumberFormat().format(item.value)} +</h4>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
