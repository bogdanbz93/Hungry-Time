import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, NavLink } from "react-bootstrap";
import { read, detailsPlace } from "../../../actions/restaurant";
import { updateUserInLocalStorage } from "../../../actions/auth";
import { getSessionId } from "../../../actions/stripe";
import Gravatar from "react-gravatar";
import "magnific-popup";
import QRCode from "qrcode.react";
import { useLocation } from "react-router";
import { processRatingStars } from "../../../helper/helper";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import Notiflix from "notiflix-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import { persoane } from "../../../data/schedule.json";
import moment from "moment";

const Listingwrapper = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const [restaurant, setRestaurant] = useState({});
  const urlPath = useLocation();
  const restaurantId = urlPath.pathname.substring(12);
  const dispatch = useDispatch();

  useEffect(() => {
    loadOwnerRestaurant();
  }, []);

  const loadOwnerRestaurant = async () => {
    if (restaurantId.length !== 24) {
      window.location.replace("/");
    } else {
      let res = await read(restaurantId);
      setRestaurant(res.data);
      setinputList(JSON.parse(res.data.drinksMenu));
      setinputList2(JSON.parse(res.data.foodMenu));
      setImage(`${process.env.REACT_APP_API}/restaurant/image/${res.data._id}`);
      setLogo(`${process.env.REACT_APP_API}/restaurant/logo/${res.data._id}`);
      setpostedByName(res.data.postedBy.name);
      setpostedByEmail(res.data.postedBy.email);
      setPlaceId(res.data.placeId);
    }
  };

  const [placeId, setPlaceId] = useState("");
  const [image, setImage] = useState("");
  const [reviews, setReviews] = useState("");
  const [logo, setLogo] = useState("");
  const [postedByName, setpostedByName] = useState("");
  const [postedByEmail, setpostedByEmail] = useState("");
  const [rating, setRating] = useState("");
  const [openNow, setOpenNow] = useState(false);
  const [inputList, setinputList] = useState([{ drinkName: "", drinkPrice: "", drinkDetails: "" }]);
  const [inputList2, setinputList2] = useState([{ foodName: "", foodPrice: "", foodDetails: "" }]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [chairs, setChair] = useState("");
  const [phone, setPhone] = useState("");
  const [disable, setDisable] = useState(true);
  const now = new moment();

  useEffect(() => {
    if (date && hour && chairs && phone) setDisable(false);
    else setDisable(true);
  }, [date, hour, chairs, phone]);

  const loadPlaceId = async () => {
    try {
      let res = await detailsPlace(placeId);
      console.log(res);
      setRating(res.data.result.rating);
      setOpenNow(res.data.result.opening_hours.open_now);
      setReviews(res.data.result.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const dateNow = new Date();

  useEffect(() => {
    if (placeId !== "") loadPlaceId();
  }, [placeId]);

  // Qr Code Download
  const downloadQR = () => {
    const canvas = document.querySelector(".HpQrcode > canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `codqr-${restaurant.title}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Buton rezervare
  const handleClick = async e => {
    e.preventDefault();
    Notiflix.Loading.Pulse("Încărcăm cererea ta..");
    if (!auth) window.location.replace("/login");
    if (date && hour && chairs && phone) {
      let res = await getSessionId(auth.token, restaurantId, date, hour, chairs, phone);
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      // Salvam rezervarea in state si o trimitem catre backend
      let newAuth = {};
      newAuth = { ...auth.user, booking: { date, hour, chairs, phone } };
      updateUserInLocalStorage(newAuth, () => {
        // redux update
        dispatch({
          type: "LOGGED_IN_USER",
          payload: newAuth
        });
      });
      stripe.redirectToCheckout({ sessionId: res.data.sessionId }).then(result => console.log(result));
    } else {
      Notiflix.Report.Failure("Din păcate..", "Nu putem efectua rezervarea dumneavoastră până nu completați toate câmpurile.", "Am înțeles");
    }
  };

  return (
    <div>
      <div className="banner banner-2 p-0">
        <div className="banner-item">
          <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + image + ")" }} />
          <div className="acr-listing-details">
            <div className="acr-listing-section">
              <div className="acr-listing-nav">
                <button onClick={downloadQR} className="btn btn-primary w-100 h-100" style={{ borderRadius: "0px" }}>
                  Descarcă codul QR <i className="fas fa-cloud-download-alt ml-2"></i>
                </button>
              </div>
              <div className="acr-listing-section-body">
                <div className="acr-listing-section-price">
                  <span>Preț rezervare masă</span>
                  <h3>{restaurant.price} RON</h3>
                  {restaurant.website ? (
                    <>
                      <span>Website restaurant</span>
                      <br />
                      <a className="btn-custom btn-sm secondary text-dark mt-2" href={restaurant.website} target="_blank" rel="noreferrer">
                        Accesează website-ul <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </>
                  ) : (
                    <>
                      <span>Website</span>
                      <p>Restaurantul nu deține un website.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="acr-listing-section">
              <div className="acr-listing-section-body">
                <div className="media d-flex align-items-center">
                  <span className="media-left">
                    <img className="mb-3" style={{ maxHeight: "40px" }} alt="logo-restaurant" src={logo} />
                  </span>
                  <div className="media-body">
                    <h4 className="mb-3">{restaurant.title}</h4>
                  </div>
                </div>

                <div className="acr-listing-icons">
                  <div className="acr-listing-icon">
                    <i className="fas fa-phone text-dark" style={{ fontSize: "20px" }}></i>
                    <span>Telefon</span>
                    <span className="acr-listing-icon-value text-dark">
                      <a className="text-dark" href={`tel:${restaurant.phone}`}>
                        {restaurant.phone}
                      </a>
                    </span>
                  </div>
                  <div className="acr-listing-icon">
                    <i className="fas fa-envelope-open text-dark" style={{ fontSize: "20px" }}></i>
                    <span>Email</span>
                    <span className="acr-listing-icon-value">
                      <a style={{ fontSize: "12px" }} className="text-dark text-nowrap" href={`mailto:${restaurant.email}`}>
                        {restaurant.email}
                      </a>
                    </span>
                  </div>
                </div>
                <p>
                  <i className="far fa-question-circle"></i> Unele informații sunt aduse serviciul Google Maps, așadar, pot interveni unele modificări în listarea acestui restaurant. Dacă sesizați informații eronate, vă rugăm să contactați restaurantul.
                </p>
              </div>
            </div>
            <div className="acr-listing-section">
              <div className="acr-listing-controls">
                <Link to="#" className="acr-listing-control">
                  <i className="flaticon-share" />
                </Link>
                <Link to="#" className="acr-listing-control">
                  <i className="flaticon-star" />
                </Link>
                <button data-toggle="modal" data-target="#rezervareModal" className="border-0 acr-schedule-tour acr-listing-control">
                  <i className="flaticon-event mr-1" /> {auth && auth.token ? "Rezervare" : "Intră în cont"}
                </button>
              </div>
              <div className="acr-listing-section-body">
                <div className="acr-listing-meta">
                  <div className="row">
                    <div className="col-lg-6 col-md-3 col-sm-3">
                      <div className="acr-listing-meta-item">
                        <span>Categorie</span>
                        <br />
                        <span className="badge badge-light border py-2 shadow-sm">
                          <span className="text-capitalize">
                            <i className="fas fa-store-alt mr-1"></i> {restaurant.category}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-3 col-sm-3">
                      <div className="acr-listing-meta-item">
                        <span>Rating</span>
                        <br />
                        <span className="badge badge-warning rounded-lg text-white py-2 shadow-sm">
                          <i className="far fa-star mr-1"></i>{" "}
                          {rating ? (
                            <>
                              {rating}{" "}
                              <sup className="text-lowercase" style={{ fontSize: "10px" }}>
                                din 5
                              </sup>
                            </>
                          ) : (
                            <>
                              0 /{" "}
                              <sup className="text-lowercase" style={{ fontSize: "10px" }}>
                                din 5
                              </sup>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-3 col-sm-3">
                      <div className="acr-listing-meta-item">
                        <span>Scaune</span>
                        <br />
                        <span className="badge badge-light border py-2 shadow-sm">
                          <span className="text-capitalize">
                            <i className="fas fa-couch mr-1"></i>
                            {restaurant.tables} locuri
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-3 col-sm-3">
                      <div className="acr-listing-meta-item">
                        <span>Orar</span>
                        <br />
                        <p>
                          {openNow ? (
                            <>
                              <span className="badge badge-success text-light shadow-sm py-2">
                                <i className="far fa-clock mr-1"></i> Deschis
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="badge badge-danger text-light shadow-sm py-2">
                                <i className="far fa-clock mr-1"></i> Închis
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section listing-wrapper pt-0 pt-md-5">
        <div className="container">
          <div className="row">
            {/* Listings Start */}
            <div className="col-lg-8">
              {/* Content Start */}
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 px-4 rounded-lg shadow-lg mb-5 justify-content-between d-none d-lg-flex">
                <h6 className="navbar-brand h6">Opțiuni</h6>
                <div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="#despre">
                        Despre
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#locatie">
                        Locație
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#pret">
                        Preț
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#meniu">
                        Meniu
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#video">
                        Videoclip
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#recenzii">
                        Recenzii
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
              <hr />
              <div className="listing-content" id="despre">
                {/* <pre>{JSON.stringify(restaurant, null, 4)}</pre> */}
                <h4>
                  Despre: <u>{restaurant.title}</u> 🥰
                </h4>
                <p>{restaurant.content}</p>
                <div className="row">
                  <div className="col">
                    <a href={`${image}`} className="gallery-thumb" target="_blank" rel="noreferrer">
                      <img className="img-fluid" src={`${image}`} alt="gallery-img"></img>
                    </a>
                  </div>
                </div>
                <hr id="locatie" />
                <h4 className="mt-3">Locația restaurantului</h4>
                <p className="mt-0">
                  <i className="fas fa-map-marker-alt"></i> {restaurant.location}
                </p>
                <iframe title="map" className="rounded" style={{ width: "100%" }} height={500} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src={`https://maps.google.com/maps?q=` + restaurant.lat + `,` + restaurant.lng + `&hl=ro&z=17&output=embed`}></iframe>
              </div>
              <hr />
              {/* Content End */}
              {/* Price Range In the area Start */}
              <div className="section p-0 pb-2" id="pret">
                <h4 className="text-left mb-4">Preț rezervare</h4>
                <div className="acr-area-price">
                  <span style={{ left: `${(restaurant.price / 150) * 100}%`, transform: `translateX(-${(restaurant.price / 150) * 100}%)`, marginLeft: "-20px" }}>{restaurant.price} RON</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${(restaurant.price / 150) * 100}%` }} aria-valuenow={(restaurant.price / 150) * 100} aria-valuemin={1} aria-valuemax={150} />
                  </div>
                  <div className="acr-area-price-wrapper">
                    <div className="acr-area-price-min">
                      <h5>1 RON</h5>
                      <span>Cel mai mic</span>
                    </div>
                    <h5>Prețul unei rezervări 💰</h5>
                    <div className="acr-area-price-max">
                      <h5>150 RON</h5>
                      <span>Cel mai mare</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Price Range In the area End */}
              <div className="row" id="meniu">
                <div className="cta cta-1 w-100 rounded-lg mb-4 mr-3 ml-2">
                  <div className="row">
                    <div className="col-8">
                      <h3 className="mx-auto">Băuturi</h3>
                    </div>
                    <div className="col-4">
                      <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/frappe.svg"} alt="frappe" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section py-0 acr-listing-features mt-4">
                <div className="listing-feature-wrapper row">
                  {inputList.map((item, i) => (
                    <div className="col-md-6" key={`drink-${i}`}>
                      <div key={`drink-${i}`} className="listing-feature mb-2 justify-content-between">
                        <span className="d-flex">
                          <i className="fas fa-glass-martini-alt text-dark" style={{ fontSize: "30px" }}></i>
                          <h6 className="listing-feature-label mb-0 ml-n1 text-dark text-nowrap">{item.drinkName}</h6>
                        </span>
                        <span className="listing-feature-value">{item.drinkPrice} RON</span>
                      </div>
                      <small>{item.drinkDetails}</small>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="cta cta-1 w-100 rounded-lg mr-3 ml-2 mb-4">
                  <div className="row">
                    <div className="col-8">
                      <h3 className="mx-auto">Mâncare</h3>
                    </div>
                    <div className="col-4">
                      <img className="mx-auto d-block mt-3 mb-4 my-n5" style={{ maxWidth: "130px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/pizza.svg"} alt="pizza" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section py-0 acr-listing-features mt-4">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="listing-feature-wrapper">
                      {inputList2.map((item, i) => (
                        <div key={`food-${i}`}>
                          <div key={`food-${i}`} className="listing-feature mb-2 justify-content-between">
                            <span className="d-flex">
                              <i className="fas fa-utensils text-dark" style={{ fontSize: "30px" }}></i>
                              <h6 className="listing-feature-label mb-0 ml-n1 text-dark text-nowrap">{`${i + 1}. ${item.foodName}`}</h6>
                            </span>
                            <span className="listing-feature-value">{item.foodPrice} RON</span>
                          </div>
                          <small>{item.foodDetails}</small>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {restaurant.ytVideo && (
                <>
                  <h4 id="video">Videoclip de prezentare</h4>
                  <div className="section pt-0">
                    <div className="embed-responsive embed-responsive-21by9">
                      <iframe title="video" className="embed-responsive-item" src={`${restaurant.ytVideo}`} />
                    </div>
                  </div>
                  <hr />
                </>
              )}

              <div id="recenzii" className="section py-2">
                <h4 className="text-left mb-2">Recenziile restaurantului ⭐</h4>
                <p>Acestea sunt ultimele 4 recenzii traduse automat. Pentru a vedea conținutul original, apăsați pe butonul "Citește toată recenzia".</p>
                <div className="row mt-4">
                  {reviews !== ""
                    ? reviews.slice(0, 4).map((item, i) => (
                        <div key={i} className="col-lg-6">
                          <div className="acr-testimonial">
                            <div className="acr-testimonial-body">
                              <h5>Recenzie Google</h5>
                              <small>{item.relative_time_description}</small>
                              <div className="acr-rating-wrapper">
                                <div className="acr-rating">{processRatingStars(item.rating)}</div>
                              </div>
                              <p>{item.text.substring(0, 95)}..</p>
                              <a href={item.author_url} className="btn btn-sm btn-outline-dark mt-3" target="_blank" rel="noreferrer">
                                Citește toată recenzia <i className="fas fa-arrow-right ml-2" />
                              </a>
                            </div>
                            <div className="acr-testimonial-author">
                              <img style={{ maxWidth: "65px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/avatar.svg"} alt="testimonial" />
                              <div className="acr-testimonial-author-inner">
                                <h6>{item.author_name}</h6>
                                <small className="font-weight-light">Recenzie acordată pe Google Maps.</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : "Încărcăm datele.."}
                </div>
              </div>
            </div>
            {/* Listings End */}
            {/* Sidebar Start */}
            <div className="col-lg-4">
              <div className="sidebar sticky-sidebar">
                <div className="sidebar-widget">
                  <h6>Fă cunoștință cu proprietarul 👋</h6>
                  {/* Author Start */}
                  <div className="media sidebar-author listing-agent">
                    <a href={`mailto:${postedByEmail}`}>
                      <Gravatar email={postedByEmail} size={100} rating="pg" className="rounded-lg" />
                    </a>
                    <div className="media-body">
                      <h6 className="mb-0">{postedByName}</h6>
                      <span>
                        <i className="far fa-envelope-open mr-2"></i>
                        {postedByEmail}
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
                            <a href={`tel:${restaurant.phone}`}>
                              {" "}
                              <i className="fas fa-phone" /> Apelează
                            </a>{" "}
                          </li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="sidebar-widget mt-4">
                  <div className="row border rounded-lg w-100 px-2 py-3 mx-0 mb-4 d-flex align-items-center">
                    <div className="col-5 col-md-12 col-xl-4">
                      <QRCode className="shadow-lg mb-xl-n2" value={`http://localhost:3000${urlPath.pathname}#meniu`} size={110} />
                    </div>
                    <div className="HpQrcode d-none">
                      <QRCode className="d-none" value={`http://localhost:3000${urlPath.pathname}#meniu`} size={800} />
                    </div>
                    <div className="col-7 col-md-12 col-xl-8">
                      <h6 className="mb-0">Meniul QR</h6>
                      <small>Acest cod QR poate fi printat și scanat cu camera.</small>
                    </div>
                  </div>
                </div>
                <h6>Comandă mâncare de la {restaurant.title}</h6>
                <img className="img-fluid" src={process.env.PUBLIC_URL + "/assets/img/listings/delivery.jpg"} alt="delivery" />
                <div className="row mt-3">
                  {restaurant.glovo ? (
                    <div className="col-4 col-sm text-center mt-3 mt-md-0">
                      <a href={`${restaurant.glovo}`} target="_blank" rel="noreferrer">
                        <img className="mr-3 mt-n2" style={{ height: "23px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/glovo.svg"} alt="glovo" />
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {restaurant.foodpanda ? (
                    <div className="col-4 col-sm text-center mt-3 mt-md-0">
                      <a href={`${restaurant.foodpanda}`} target="_blank" rel="noreferrer">
                        <img className="mr-3" style={{ height: "22px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/foodpanda.svg"} alt="foodpanda" />
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {restaurant.tazz ? (
                    <div className="col-4 col-sm text-center mt-3 mt-md-0">
                      <a href={`${restaurant.tazz}`} target="_blank" rel="noreferrer">
                        <img style={{ height: "16px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/tazz.svg"} alt="tazz" />
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* Sidebar End */}
          </div>
        </div>
      </div>
      <div className="modal fade p-0 m-0" id="rezervareModal" tabIndex={-1} role="dialog" aria-labelledby="rezervareModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                <i className="far fa-bookmark mr-1"></i> Rezervă o masă în {restaurant.title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <hr className="mt-0 mb-3" />
              <Calendar onChange={value => setDate(value.toLocaleDateString())} minDate={dateNow} locale={"ro-RO"} className="w-100 border-0" />
              <hr className="mt-0 mb-3" />
              <div className="row">
                <div className="col-12 col-lg-5">
                  <TimePicker onChange={value => setHour(value)} minTime={now.format("HH:mm:ss")} disableClock={true} className="border rounded-lg p-3 w-100" />
                </div>
                <div className="col-12 col-lg-7 mt-3 mt-lg-0">
                  <select onChange={e => setChair(e.target.value)} className="form-control mt-lg-1">
                    {persoane.map(item => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12 mt-3 mb-0 text-center">
                  <span>Selectează ora și numărul persoanelor.</span>
                </div>
                <div className="col-12 mt-3 mb-0 text-center">
                  <input onChange={e => setPhone(e.target.value)} value={phone} className="form-control w-100" type="text" id="phone" placeholder="Număr de telefon" name="phone" required minLength="4" maxLength="12" size="10"></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-custom danger" data-dismiss="modal">
                Renunță
              </button>
              <button type="button" onClick={handleClick} disabled={disable} className="btn btn-custom">
                Către plată - {restaurant.price} ron
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> ////////////////////
  );
};

export default Listingwrapper;
