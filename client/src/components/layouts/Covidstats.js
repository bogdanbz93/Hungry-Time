import React, { useState } from "react";
import axios from "axios";

const Covidstats = () => {
  const [covidNumber, setcovidNumber] = useState();
  const [counter, setCounter] = useState(0);

  const getCovidData = () => {
    const options = {
      method: "GET",
      url: "https://coronavirus-smartable.p.rapidapi.com/stats/v1/RO/",
      headers: {
        "x-rapidapi-key": "429c29e57bmsh5d5c8e001647c47p19171djsncfd29f6ff96b",
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        const newly = JSON.stringify(response.data.stats.newlyConfirmedCases);
        console.log(newly);
        setcovidNumber(newly);
      })
      .catch(function (error) {
        console.error("A fost o eroare la aducerea raportului: " + error);
      });
    setCounter(counter + 1);
  };

  return (
    <div>
      <button type="button" className="btn-custom primary w-75 text-light" data-toggle="modal" data-target="#covidStats" onClick={getCovidData}>
        Cazuri COVID-19 <i className="fas fa-chevron-right text-light"></i>{" "}
      </button>

      <div className="modal fade" id="covidStats" tabIndex={-1} role="dialog" aria-labelledby="covidStatsTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Cazuri noi confirmate COVID-19 în România 😷
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center px-5">
              <img style={{ width: "300px" }} src={process.env.PUBLIC_URL + "/assets/img/footer/covid-stats.svg"} alt="covid" />
              <h5 className="mt-4 mb-0">
                Numărul total de cazuri noi confirmate în ultimele 24 de ore: <span className="badge badge-pill badge-danger">{covidNumber}</span>
              </h5>
            </div>
            <div className="modal-footer justify-content-center">
              <p className="text-dark mb-2">
                Informații generate de <u>Coronavirus Smartable API</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covidstats;
