import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRestaurantBookings } from "../../../actions/restaurant";
import { useSelector } from "react-redux";
import moment from "moment";

const Content = () => {
  const [booking, setBooking] = useState([]);
  const {
    auth: { token }
  } = useSelector(state => ({ ...state }));

  const loadUserBookings = async () => {
    const res = await userRestaurantBookings(token);
    setBooking(res.data);
  };

  useEffect(() => {
    loadUserBookings();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar user-nav sidebar-left">
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
                  <a href="/profile-bookings" className="active">
                    📕 Rezervările mele
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="acr-empty-section">
              <img style={{ maxWidth: "300px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/bookings.svg"} alt="table" />
              <h3>
                {booking.length >= 1 ? (
                  <>
                    {booking.length} <u>rezervări</u> în total.
                  </>
                ) : (
                  <>
                    <u>Rezervările</u> mele.
                  </>
                )}
              </h3>
              <small style={{ fontSize: "12px" }}>
                <i style={{ fontSize: "12px" }} className="fas fa-info-circle mr-1"></i>Aici găsești toate rezervările tale la restaurantele partenere.
              </small>
            </div>
            <hr />
            {booking.length >= 1 ? (
              <>
                {booking.map((item, i) => (
                  <div key={i} className="listing listing-list mx-1 mx-md-0 row">
                    <div className="listing-thumbnail m-md-0 col-md-5">
                      <Link to={`/restaurant/${item.restaurant._id}`}>{item.restaurant.image && item.restaurant.image.contentType ? <img style={{ width: "100%", height: "235px" }} className="img-fluid" src={`${process.env.REACT_APP_API}/restaurant/image/${item.restaurant._id}`} alt="imageRestaurant"></img> : <img src="https://via.placeholder.com/500x260.png?text=Hungry%20Time" alt="listing" />}</Link>
                      <div className="listing-badges">
                        <span className="listing-badge pending text-capitalize">{item.restaurant.category}</span>
                      </div>
                    </div>

                    <div className="listing-body col-md-7">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="pr-5">
                          {" "}
                          <h5 className="listing-title">
                            {" "}
                            <Link className="mb-0" to={`/restaurant/${item.restaurant._id}`} title={item.restaurant.title}>
                              {item.restaurant.title}
                            </Link>{" "}
                          </h5>
                          <small style={{ fontSize: "12px" }}>
                            <i className="far fa-calendar mr-1"></i> Ai făcut o programare pentru data de <b>{item.date}</b> la ora <b>{item.hour}</b>.
                          </small>
                        </div>
                        <div>{item.restaurant.logo && item.restaurant.logo.contentType ? <img style={{ maxHeight: "60px" }} src={`${process.env.REACT_APP_API}/restaurant/logo/${item.restaurant._id}`} alt="logoRestaurant"></img> : <img className="rounded-lg" src="https://via.placeholder.com/80x50.png?text=Logo" alt="listing" />}</div>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span className="mt-0 mb-0">
                          <span>
                            Ai plătit <b>{item.session.amount_total / 100} RON</b> cu {moment(item.createdAt).fromNow()}
                          </span>{" "}
                        </span>
                      </div>
                      <div className="acr-listing-icons d-flex justify-content-between align-items-center">
                        <div>
                          <div className="acr-listing-icon">
                            <i className="fas fa-users"></i>
                            <span className="acr-listing-icon-value mr-1">{item.chairs}</span> pers.
                          </div>
                        </div>
                        <div>
                          {item.restaurant.glovo ? (
                            <a href={`${item.restaurant.glovo}`} target="_blank" rel="noreferrer">
                              <img className="mr-3 mt-n2" style={{ height: "17px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/glovo.svg"} alt="glovo" />
                            </a>
                          ) : (
                            ""
                          )}
                          {item.restaurant.foodpanda ? (
                            <a href={`${item.restaurant.foodpanda}`} target="_blank" rel="noreferrer">
                              <img className="mr-3" style={{ height: "18px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/foodpanda.svg"} alt="foodpanda" />
                            </a>
                          ) : (
                            ""
                          )}
                          {item.restaurant.tazz ? (
                            <a href={`${item.restaurant.tazz}`} target="_blank" rel="noreferrer">
                              <img style={{ height: "12px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/tazz.svg"} alt="tazz" />
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="listing-gallery-wrapper">
                        <button data-toggle="modal" data-target={`#modalBook-${i}`} className="btn-custom btn-sm">
                          Detalii despre această plată <i className="fas fa-wallet"></i>
                        </button>
                        <Link to={`/restaurant/${item.restaurant._id}`} className="listing-gallery">
                          {" "}
                          <i className="fas fa-camera" />{" "}
                        </Link>
                      </div>
                    </div>
                    <div className="modal fade" id={`modalBook-${i}`} tabIndex={-1} role="dialog" aria-labelledby={`modalBook-${i}-Title`} aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id={`modalBook-${i}-Title`}>
                              Detalii despre plată
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <img style={{ maxWidth: "80px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/card_payment.svg"} alt="card" />
                            <hr className="my-2" />
                            <p>
                              💸 Pentru această comandă ați plătit: <b>{item.session.amount_total / 100} RON</b>.
                            </p>
                            <p>
                              Codul de referință este: <u>{item.session.id.substring(0, 35)}</u>..{" "}
                            </p>
                            <hr className="my-2" />
                            <p>
                              💰 Plata prin <b>Stripe.com</b> a fost efectuată pe email-ul: {item.session.customer_details.email}
                            </p>
                            <p>
                              Cu id-ul: <u>#{item.session.customer}</u>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="acr-empty-section">
                  <h3>Din păcate, nu am găsit nimic. 😔</h3>
                  <p>Nu ai nicio rezervare făcută până acum. Dar stai liniștit, nu este timpul pierdut! Așadar, hai pe prima pagină să-ți găsim un restaurant.</p>
                  <a href="/" className="btn-custom">
                    Către prima pagină
                  </a>
                </div>
              </>
            )}

            {/* <pre>{JSON.stringify(booking, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
