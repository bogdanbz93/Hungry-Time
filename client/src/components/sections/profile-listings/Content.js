import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { createConnectAccount } from "../../../actions/stripe";
import Notiflix from "notiflix-react";
import { ownerRestaurant, deleteRestaurant } from "../../../actions/restaurant";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const seats = <Tooltip>Locuri</Tooltip>;
const trash = <Tooltip>Șterge</Tooltip>;
const edit = <Tooltip>Editează</Tooltip>;

const Content = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOwnerRestaurants();
  }, []);

  const loadOwnerRestaurants = async () => {
    let { data } = await ownerRestaurant(auth.token);
    setRestaurants(data);
  };

  const handleRestaurantDelete = async (restaurantId, restaurantName) => {
    Notiflix.Confirm.Show("Atenționare", `Ești sigur că vrei să ștergi restaurantul ${restaurantName}? Această opțiune este definitivă.`, "Da, șterge", "Nu", () => {
      Notiflix.Loading.Dots("Ștergem datele restaurantului..");
      deleteRestaurant(auth.token, restaurantId).then(res => {
        loadOwnerRestaurants();
        Notiflix.Loading.Remove(600);
        setTimeout(Notiflix.Report.Success("Success", `Restaurantul ${restaurantName} a fost șters din platformă. Te așteptăm înapoi, oricând.`, "Închide"), 750);
      });
    });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      Notiflix.Report.Failure("Conectare eșuată", "Din păcate nu am putut asocia contul tău Hungry Time cu Stripe Connect.", "Încearcă din nou");
      setLoading(false);
    }
  };

  const connected = () => {
    return (
      <div>
        <div className="acr-empty-section mb-5">
          <img style={{ maxWidth: "300px" }} className="mb-2" src={process.env.PUBLIC_URL + "/assets/img/listings/restaurant.svg"} alt="stripe" />
          <h3>
            Restaurantele tale <u>deținute</u>.
          </h3>

          <Link to="/profile" className="btn btn-custom mb-3 px-5">
            <i className="fas fa-arrow-left mr-2" style={{ fontSize: "12px" }}></i> Înapoi la pagina de profil
          </Link>
          <Link to="/submit-listing" className="btn btn-custom secondary mb-3 px-5 ml-2">
            Adaugă un restaurant <i className="fas fa-arrow-right ml-2" style={{ fontSize: "12px" }}></i>
          </Link>
          <br />
          <small style={{ fontSize: "12px" }}>
            <i style={{ fontSize: "12px" }} className="fas fa-info-circle mr-1"></i>Dacă dorești modificarea setărilor de plată, întoarce-te pe pagina de profil.
          </small>
        </div>
        <hr />
        {restaurants.length > 0 ? (
          <>
            {restaurants.map((item, i) => (
              <div key={i} className="listing listing-list mx-1 mx-md-0 row">
                <div className="listing-thumbnail m-md-0 col-md-5">
                  <Link to={`/restaurant/${item._id}`}>{item.image && item.image.contentType ? <img style={{ width: "100%", height: "235px" }} className="img-fluid" src={`${process.env.REACT_APP_API}/restaurant/image/${item._id}`} alt="imageRestaurant"></img> : <img src="https://via.placeholder.com/500x260.png?text=Hungry%20Time" alt="listing" />}</Link>
                  <div className="listing-badges">
                    <span className="listing-badge pending text-capitalize">{item.category}</span>
                  </div>
                  <div className="listing-controls">
                    <a href={`restaurant/edit/${item._id}`} className="edit">
                      <i className="fas fa-edit" />
                    </a>
                  </div>
                </div>

                <div className="listing-body col-md-7">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="pr-5">
                      {" "}
                      <h5 className="listing-title">
                        {" "}
                        <Link className="mb-0" to={`/restaurant/${item._id}`} title={item.title}>
                          {item.title}
                        </Link>{" "}
                      </h5>
                      <small style={{ fontSize: "12px" }} className="text-capitalize">
                        {item.location}
                      </small>
                    </div>
                    <div>{item.logo && item.logo.contentType ? <img style={{ maxHeight: "60px" }} src={`${process.env.REACT_APP_API}/restaurant/logo/${item._id}`} alt="logoRestaurant"></img> : <img className="rounded-lg" src="https://via.placeholder.com/80x50.png?text=Logo" alt="listing" />}</div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="listing-price mt-0 mb-0">
                      {item.price} RON <span>/rezervare</span>{" "}
                    </span>
                    <div className="border p-1 rounded-lg mb-0">
                      <OverlayTrigger overlay={trash}>
                        <button style={{ cursor: "pointer" }} onClick={() => handleRestaurantDelete(item._id, item.title)} className="mr-4 btn btn-link p-0">
                          <i className="far fa-trash-alt text-danger"></i>
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={edit}>
                        <a href={`restaurant/edit/${item._id}`} className="mr-2">
                          <i className="far fa-edit text-dark"></i>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
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
                    <button onClick={() => (window.location.href = `/restaurant/orders/${item._id}`)} className="btn-custom btn-sm">
                      Rezervările restaurantului <i className="fas fa-list"></i>
                    </button>
                    <OverlayTrigger overlay={gallerytip}>
                      <Link to={`/restaurant/${item._id}`} className="listing-gallery">
                        {" "}
                        <i className="fas fa-camera" />{" "}
                      </Link>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="acr-empty-section">
              <h3>Nu ai listat niciun restaurant. 😴</h3>
              <p>
                În acest moment ai primit tag-ul de "proprietar de restaurant", chiar dacă nu ai listat unul momentan. <br />
                Ei bine, acum poți să o faci fără probleme!
              </p>
            </div>
          </>
        )}
      </div>
    );
  };

  const notConnected = () => {
    return (
      <div className="acr-empty-section">
        <img style={{ maxWidth: "300px" }} className="mb-2" src={process.env.PUBLIC_URL + "/assets/img/listings/stripe_hands.svg"} alt="stripe" />
        <h3>
          Autentifică-te prin <u>Stripe Connect</u>.
        </h3>
        <p>Nu poți începe înscrierea propriului restaurant sau local până nu conectezi contul tău la serviciile Stripe Connect.</p>
        <button disabled={loading} onClick={handleClick} className="btn btn-custom mb-3 px-5">
          {loading ? "Se încarcă..." : "Setări plăți"}
        </button>
        <br />
        <small style={{ fontSize: "12px" }}>
          <i style={{ fontSize: "12px" }} className="fas fa-info-circle mr-1"></i>Vei fi redirecționat către pagina oficială Stripe.com pentru a finaliza procedeul.
        </small>
      </div>
    );
  };

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
                  <a href="/profile-listings" className="active">
                    🏪 Restaurante deținute
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="/profile-bookings">📕 Rezervările mele</a>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">{auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected() : notConnected()}</div>
        </div>
      </div>
    </div>
  );
};

export default Content;
