import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import { allRestaurants } from "../../../actions/restaurant";
import moment from "moment";
import "moment/locale/ro";
import Gravatar from "react-gravatar";

const gallerytip = <Tooltip>Galerie</Tooltip>;
const seats = <Tooltip>Locuri</Tooltip>;
const website = <Tooltip>Website</Tooltip>;

const Recentlisting = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadAllRestaurants();
  }, []);

  const loadAllRestaurants = async () => {
    let res = await allRestaurants();
    setRestaurants(res.data);
  };

  return (
    <>
      <div className="section section-padding">
        <div className="container">
          <div className="section-title-wrap section-header flex-header">
            <div className="section-title-text">
              <h5 className="custom-primary">
                Caută restaurantul tău <u>preferat</u> 🤙
              </h5>
              <h2 className="title">Listări recente</h2>
            </div>
            <Link to="/listing-map" className="btn-custom">
              Vezi toate restaurantele <i className="fas fa-long-arrow-alt-right"></i>
            </Link>
          </div>
          <div className="row">
            {/* Listing Start */}
            {restaurants.slice(0, 6).map((item, i) => (
              <div key={i} className="col-lg-4">
                <div className="listing">
                  <div className="listing-thumbnail">
                    <a href={`/restaurant/${item._id}`}>{item.image && item.image.contentType ? <img style={{ width: "100%", height: "250px" }} className="img-fluid" src={`${process.env.REACT_APP_API}/restaurant/image/${item._id}`} alt="imageRestaurant"></img> : <img src="https://via.placeholder.com/500x260.png?text=Hungry%20Time" alt="listing" />}</a>
                    <div className="listing-badges">
                      <span className="listing-badge pending px-3 text-capitalize mr-2">
                        <i className="fas fa-stream mr-2"></i>
                        {item.category}
                      </span>
                      <span className="listing-badge px-3">
                        <small className="text-capitalize">
                          <i className="fas fa-map-marker-alt mr-2"></i>
                          {item.city}
                        </small>
                      </span>
                    </div>
                  </div>
                  <div className="listing-body">
                    <div className="listing-author">
                      <Gravatar email={item.postedBy.email} size={100} rating="pg" className="rounded-circle shadow-lg" />
                      <div className="listing-author-body">
                        <p className="mb-0">
                          {" "}
                          <a href={`mailto:${item.postedBy.email}`}>
                            <i className="far fa-user mr-1"></i> {item.postedBy.name}
                          </a>{" "}
                        </p>
                        <span className="listing-date">
                          <i style={{ fontSize: "15px" }} className="far fa-clock mr-1 text-dark"></i> Adăugat cu {moment(item.createdAt).fromNow()}.
                        </span>
                      </div>
                      <Dropdown className="options-dropdown">
                        <Dropdown.Toggle as={NavLink}>
                          <i className="fas fa-ellipsis-v" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                          <ul>
                            <li>
                              {" "}
                              <a href={`tel:+${item.phone}`}>
                                {" "}
                                <i className="fas fa-phone" /> Apelează
                              </a>{" "}
                            </li>
                            <li>
                              {" "}
                              <a href={`mailto:${item.postedBy.email}`}>
                                {" "}
                                <i className="fas fa-envelope" /> Mesaj
                              </a>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link to={`/restaurant/${item._id}`}>
                                {" "}
                                <i className="fas fa-bookmark" /> Rezervare
                              </Link>{" "}
                            </li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="pr-5">
                        <h5 className="listing-title mt-2">
                          {" "}
                          <a href={`/restaurant/${item._id}`} className="mb-0" title={item.title}>
                            {item.title}
                          </a>{" "}
                        </h5>
                        <small className="text-capitalize">{item.location.substring(0, 55)} (..)</small>
                      </div>
                      <div>{item.logo && item.logo.contentType ? <img style={{ maxHeight: "50px" }} src={`${process.env.REACT_APP_API}/restaurant/logo/${item._id}`} alt="logoRestaurant"></img> : <img className="rounded-lg" src="https://via.placeholder.com/80x50.png?text=Logo" alt="listing" />}</div>
                    </div>
                    <hr className="mb-4 mt-0" />
                    <div className="d-flex justify-content-between mb-3">
                      <span className="listing-price mb-0">
                        {item.price} RON <span>/rezervare</span>{" "}
                      </span>
                      {item.website && (
                        <>
                          <div className="border px-2 rounded-lg mb-0">
                            <OverlayTrigger overlay={website}>
                              <a href={`${item.website}`} className="text-dark" target="_blank" rel="noreferrer">
                                <i className="fas fa-link"></i>
                              </a>
                            </OverlayTrigger>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="listing-text">
                      {item.content.substring(0, 60)}... <Link to={`/restaurant/${item._id}`}>(citește mai mult)</Link>
                    </p>
                    <div className="acr-listing-icons d-flex justify-content-between align-items-center">
                      <div>
                        <OverlayTrigger overlay={seats}>
                          <div className="acr-listing-icon">
                            <i className="fas fa-users"></i>
                            <span className="acr-listing-icon-value">{item.tables}</span>
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div>
                        {item.glovo ? (
                          <a href={`${item.glovo}`} target="_blank" rel="noreferrer">
                            <img className="mr-3 mt-n2" style={{ height: "17px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/glovo.svg"} alt="glovo" />
                          </a>
                        ) : (
                          ""
                        )}
                        {item.foodpanda ? (
                          <a href={`${item.foodpanda}`} target="_blank" rel="noreferrer">
                            <img className="mr-3" style={{ height: "18px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/foodpanda.svg"} alt="foodpanda" />
                          </a>
                        ) : (
                          ""
                        )}
                        {item.tazz ? (
                          <a href={`${item.tazz}`} target="_blank" rel="noreferrer">
                            <img style={{ height: "12px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/tazz.svg"} alt="tazz" />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="listing-gallery-wrapper">
                      <a href={`/restaurant/${item._id}`} className="btn-custom btn-sm secondary text-dark">
                        Vezi mai multe detalii <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                      <OverlayTrigger overlay={gallerytip}>
                        <a href={`/restaurant/${item._id}/despre`} className="listing-gallery">
                          {" "}
                          <i className="fas fa-camera" />{" "}
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Listing End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recentlisting;
