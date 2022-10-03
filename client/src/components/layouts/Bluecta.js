import React, { Component } from "react";
// import { Link } from "react-router-dom";

class Bluecta extends Component {
  render() {
    return (
      <div className="container shadow-lg p-0 rounded-lg">
        <div className="cta cta-1">
          <div className="row align-items-center">
            <div className="col-lg-4 mb-5 mb-lg-0 text-center">
              <img className="m-auto d-none d-lg-block" src={process.env.PUBLIC_URL + "/assets/img/bar.svg"} alt="logo" />
              <img className="m-auto d-block d-lg-none px-5" src={process.env.PUBLIC_URL + "/assets/img/bar.svg"} alt="logo" />
            </div>
            <div className="offset-lg-1 col-lg-7 px-3 pb-3">
              <h4 className="text-white pr-lg-3">
                Meniu digital – aplicație web pentru informațiile restaurantului prin <u>QR code</u>
              </h4>
              <p>Meniul digital interactiv – sau meniul contactless, cum mai este numit – reprezintă un avantaj competitiv pentru restaurantele care îl adoptă. Dacă dețineți un restaurant, cafenea sau cofetărie, Hungry Time vă ajută să implementați rapid meniul digital accesibil pe bază de cod QR.</p>
              <button className="btn btn-sm btn-custom-2 grey" data-toggle="modal" data-target="#codQrCenter">
                Cum arată un cod QR?
              </button>
            </div>
          </div>
        </div>
        <div className="modal fade" id="codQrCenter" tabIndex={-1} role="dialog" aria-labelledby="codQrCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="codQrLongTitle">
                  Despre codurile QR
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <img className="m-auto d-none d-lg-block rounded-lg" src={process.env.PUBLIC_URL + "/assets/img/home/qr-code.jpg"} alt="codeqr" />
                <p className="mt-3 mb-0">
                  <b>QR code</b> este prescurtarea de la Quick Response Code, care, în traducere, ar fi cod răspuns rapid. Chiar dacă aspectul este unul foarte simplist, cu ajutorul codurilor QR se pot stoca cantități foarte mari de date și, mai mult, indiferent cât de multe informații conțin, prin scanarea lor, utilizatorul are acces la aceste informații foarte rapid.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-custom" data-dismiss="modal">
                  Am înțeles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bluecta;
