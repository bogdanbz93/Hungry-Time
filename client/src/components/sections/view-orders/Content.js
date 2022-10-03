import React, { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { orders } from "../../../actions/restaurant";
import moment from "moment";
import Clock from "react-live-clock";
import { useLocation } from "react-router";

const Content = () => {
  // Redux
  const { auth } = useSelector(state => ({ ...state }));

  // Get the id from url
  const urlPath = useLocation();
  const restaurantId = urlPath.pathname.substring(19);

  useEffect(() => {
    loadOwnerOrders();
  }, []);

  const loadOwnerOrders = async () => {
    if (restaurantId.length !== 24) {
      console.log(restaurantId.length);
      window.location.replace("/profile-listings");
    } else {
      let res = await orders(auth.token, auth.user._id, restaurantId);
      setOrders(res.data);
    }
  };

  const [order, setOrders] = useState([]);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const event = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          window.location.reload();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <Tab.Container defaultActiveKey="tab1">
            {/* Tabs Start */}
            <div className="col-md-4 user-nav">
              <button className="btn btn-link m-0 p-0" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left mr-1"></i> Înapoi
              </button>
              <hr />
              <ul>
                <li>
                  {" "}
                  <a href="/profile"> ⚙️ Informații cont</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="/profile-listings">🏪 Restaurante deținute</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="/profile-bookings">📕 Rezervările mele</a>{" "}
                </li>
              </ul>
            </div>
            {/* Tabs End */}
            {/* Tab Content Start */}
            <div className="col-md-8">
              <div className="row mb-0">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Rezervări</h5>
                  <div className="shadow-sm px-2 rounded-lg">
                    {minutes === 0 && seconds === 0 ? null : (
                      <div>
                        <small className="mb-0 text-dark">
                          Pagina se reîncarcă în{" "}
                          <b>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                          </b>
                          <div className="spinner-grow spinner-grow-sm mb-1 ml-2 text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mb-4">
                <div className="col-lg-4 mb-3 mb-lg-0">
                  <div className="statContainer blue shadow-sm">
                    <div className="titleStats text-center rounded-lg shadow-sm">Statistici</div>
                    <div className="d-flex">
                      <div className="p-2 flex-fill text-center">
                        Nr. rezervări <br />
                        <h6>
                          <i className="fas fa-list-ol mr-1"></i> {order.length}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="statContainer pink shadow-sm">
                    <div className="titleStats text-center rounded-lg shadow-sm">Informații</div>
                    <div className="d-flex">
                      <div className="p-2 flex-fill text-center">
                        Ora actuală <br />
                        <h6>
                          <i className="far fa-clock mr-1"></i> <Clock format={"h:mm:ssa"} ticking={true} />
                        </h6>
                      </div>
                      <div className="p-2 flex-fill text-center status">
                        Data de azi
                        <br />
                        <h6>
                          <i className="far fa-calendar-alt mr-1"></i> {event.toLocaleDateString("ro-RO", options)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                {order.length > 0 ? (
                  order.map((item, i) => {
                    return (
                      <div key={i} className="col-12 col-lg-6 mb-5">
                        <div className="acr-testimonial-body">
                          <h5 ClassName="mb-0">O nouă rezervare</h5>
                          <p className="mt-0 mb-2" style={{ fontSize: "12px" }}>
                            Rezervarea cu id-ul #{item._id}
                          </p>
                          Rezervare pe data de <b>{item.date}</b>.<br /> Ora rezervării este <b>{item.hour}</b> ({item.chairs} persoane).
                          <p className="m-0">
                            <i className="far fa-clock mr-1"></i> Efectuată cu {moment(item.createdAt).fromNow()}.
                          </p>
                          <div className="btn-group w-100 mt-3 shadow-lg rounded-lg" role="group" aria-label="User commands">
                            <a href={`tel:${item.phone}`} className="btn btn-custom-2 light-grey text-dark">
                              <i className="fas fa-phone mr-2 custom-success"></i> Apel
                            </a>
                            <a href={`mailto:${item.session.customer_details.email}`} className="btn btn-custom-2 light-grey text-dark">
                              <i className="fas fa-envelope-open mr-2"></i> Mesaj
                            </a>
                          </div>
                        </div>
                        <div className="acr-testimonial-author">
                          <img style={{ maxWidth: "65px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/avatar.svg"} alt="testimonial" />
                          <div className="acr-testimonial-author-inner">
                            <h6>{item.orderedBy.name}</h6>
                            <a href={`mailto: ${item.session.customer_details.email}`} className="text-muted">
                              <small className="font-weight-light">a plătit suma de {item.session.amount_total / 100} RON. 💸</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="acr-empty-section">
                      <img style={{ maxWidth: "300px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/not_found.svg"} alt="stripe" />
                      <h3>
                        Momentan nu există <u>rezervări</u>.
                      </h3>
                      <p>Din păcate, nu există încă nicio rezervare pentru acest restaurant. Dar, cu siguranță, vom găsi persoane care vor dori să vină în restaurantul tău.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Tab.Container>
          {/* Tab Content End */}
        </div>
      </div>
    </div>
  );
};

export default Content;
