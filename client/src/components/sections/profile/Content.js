import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, deleteAccount } from "../../../actions/auth";
import { getAccountBalance, currencyFormater, payoutSetting } from "../../../actions/stripe";
import moment from "moment";
import "moment/locale/ro";
import Notiflix from "notiflix-react";
import Gravatar from "react-gravatar";

const Content = () => {
  const { auth } = useSelector(state => ({ ...state }));

  // Update Profile
  const [name, setName] = useState(auth.user.name);
  const [updated, setUpdated] = useState(true);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();

  // Account Balance
  useEffect(() => {
    getAccountBalance(auth.token).then(res => {
      console.log(res);
      setBalance(res.data);
    });
  }, [auth.token]);

  // Payout settings
  const handlePayoutSettings = async () => {
    Notiflix.Loading.Pulse("Încărcăm datele tale din Stripe..");
    console.log(auth.token);

    try {
      const res = await payoutSetting(auth.token);
      console.log("RES FOR PAYOUT SETTINGS ====>", res);
      Notiflix.Loading.Remove(500);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
      Notiflix.Loading.Remove(500);
      Notiflix.Report.Failure("A apărut o eroare", "Din păcate nu am reușit să văd aducem adresa dvs. de Stripe. Încercați din nou.", "Ok, continuă");
    }
  };

  // Delete account
  const deletemyAccount = () => {
    try {
      Notiflix.Confirm.Show("Înainte să facem modificările..", "Ești sigur că vrei să îți ștergi contul? Această opțiune este definitivă!", "Da", "Închide", () => {
        deleteAccount({ _id: auth.user._id });
        dispatch({
          type: "LOGGOUT",
          payload: null
        });
        window.localStorage.removeItem("auth");
        window.localStorage.setItem("confirmLogout", "confirmLogout");
        window.location.replace("/login");
      });
    } catch (err) {
      console.log("err la stergerea contului: ", err);
    }
  };

  // Data de acum // Mongo Db
  let comparisonDays = moment().diff(auth.user.updatedAt, "days");
  useEffect(() => {
    if (comparisonDays >= 7) setUpdated(false);
  }, [updated, comparisonDays]);

  var localTime = moment();

  const handleButton = e => {
    e.preventDefault();
    Notiflix.Confirm.Show("Înainte să facem modificările..", "Ești sigur că vrei să modifici datele tale cu cele introduse?", "Da", "Închide", updatemyProfile);
  };

  const updatemyProfile = () => {
    try {
      let res = updateProfile({ _id: auth.user._id, name });
      if (res.data) console.log(JSON.stringify(res.data));
      // Refacem state-ul
      const newAuth = JSON.parse(localStorage.getItem("auth"));
      newAuth.user.name = name;
      newAuth.user.updatedAt = localTime;
      localStorage.setItem("auth", JSON.stringify(newAuth));
      // Dispatch -> redux
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data
      });
      window.location.reload();
    } catch (err) {
      console.log("err la update profile: ", err);
    }
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
                  <a href="/profile" className="active">
                    {" "}
                    ⚙️ Informații cont
                  </a>{" "}
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
          </div>
          <div className="col-lg-8">
            <div className="acr-welcome-message">
              <h3>Sold curent</h3>
              <hr className="mb-3 mt-2" />
              <h6 className="mb-0">Detaliile contului meu de vânzări</h6>
              <small>Aici puteți vedea balanța contului dumneavoastră.</small>
              <div className="row border mx-0 my-3 p-3 rounded-lg">
                <div className="col-12 col-lg-6 border-right">
                  <h6 className="mb-0">Sold în așteptare</h6>
                  {auth && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? (
                    <>
                      <h5 className="font-weight-light mt-1 mb-0">💰 {balance && balance.pending && balance.pending.map((bp, i) => <span key={i}>{currencyFormater(bp)}</span>)}</h5>
                    </>
                  ) : (
                    <>
                      <span className="badge badge-pill badge-warning">
                        <i className="fas fa-exclamation-circle"></i> Nu sunteți proprietar al unui local.
                      </span>
                    </>
                  )}
                </div>
                <div className="col-12 col-lg-6">
                  <h6 className="mb-0 mt-3 mt-lg-0">Setări de plată</h6>
                  {auth && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? (
                    <>
                      <button type="button" onClick={handlePayoutSettings} className="btn btn-custom btn-sm rounded-lg shadow">
                        Setări cont Stripe <i className="far fa-credit-card ml-1"></i>{" "}
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="badge badge-pill badge-warning">
                        <i className="fas fa-exclamation-circle"></i> Mai întâi configurați serviciul Stripe.
                      </span>
                    </>
                  )}
                </div>
              </div>
              {auth && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? (
                <>
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-info-circle mr-2"></i>
                    În acest moment contul dumneavoastră este în stadiul de proprietar. Pentru a vă vedea propriul restaurant, intrați în pagina <Link to="/profile-listings">"restaurante deținute"</Link>.
                  </div>
                </>
              ) : (
                <>
                  <div className="alert alert-warning" role="alert">
                    <i className="fas fa-info-circle mr-2"></i>
                    <u>Atenție:</u> În acest moment contul dumneavoastră este în stadiul de client. Activează contul de proprietar dacă deții un restaurant sau local în pagina <Link to="/profile-listings">"restaurante deținute"</Link>.
                  </div>
                </>
              )}
              <hr />
            </div>
            <div className="bg-light py-5 px-3 px-md-5 rounded-lg">
              <h3 className="text-center">Informațiile contului meu</h3>
              <hr />
              <p>Aceste date pot fi modificate o singură dată pe săptămână (doar dacă ultimele modificări au fost făcute acum 7 zile). Așadar, vă rugăm să aveți grijă atunci când vă introduceți datele dumneavoastră.</p>
              <form onSubmit={handleButton}>
                <div className="row">
                  <div className="col-lg-6 form-group">
                    <label>Numele tău {updated ? <i className="fas fa-lock"></i> : <i className="fas fa-unlock"></i>}</label>
                    <input disabled={updated} type="text" className={`form-control ${updated && "is-invalid"}`} placeholder={name} defaultValue={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>
                      Adresa de email <i className="fas fa-lock"></i>
                    </label>
                    <input disabled="disabled" type="email" className="form-control is-invalid" placeholder={auth.user.email} defaultValue={auth.user.email} />
                    <small style={{ fontSize: "13px" }} className="text-danger float-right mt-1">
                      Email-ul nu poate fi modificat (<a href="mailto:contact@hungrytime.ro?subject=Doresc modificarea adresei de email">contactați un administrator</a>).
                    </small>
                  </div>
                  {/* <div className="col-lg-12 form-group">
                    <label>Biografie</label>
                    <textarea name="about" rows={4} className="form-control" placeholder="Câte ceva despre mine.." />
                  </div> */}
                </div>
                <p className="border py-2 px-3 rounded-lg">
                  <i className="far fa-clock"></i> Ultimele modificări au fost făcute cu <b>{moment(auth.user.updatedAt).fromNow()}</b>. <br />
                  Atenție! Dacă modificați și setările cardului Stripe sau metodele de plată, acest interval se resetează.
                </p>
                <button disabled={updated} type="submit" name="submit" className="btn-custom">
                  Salvează noile modificări
                </button>
              </form>
            </div>
            <hr />
            <div>
              <div className="row mb-3">
                <div className="col-8 col-md-9">
                  <h3>Poză de profil</h3>
                </div>
                <div className="col-4 col-md-3">
                  <a className="w-100" href="https://en.gravatar.com/" target="_blank" rel="noreferrer">
                    <img className="mx-auto d-block " style={{ maxWidth: "150px" }} src={process.env.PUBLIC_URL + "/assets/img/listings/gravatar.svg"} alt="gravatar" />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-9 col-lg-10">
                  <p>
                    Aplicația noastră este conectată la serviciul Gravatar.com. Dacă în acest moment ai o imagine prestabilită cu diferite animații și culori, asta înseamnă că email-ul înregistrat în platforma noastră nu este înregistrat și pe Gravatar. Creează unul cu același email (<span className="text-info">{auth.user.email}</span>) pe Gravatar.
                  </p>
                </div>
                <div className="col-12 col-md-3 col-lg-2 text-center text-md-left">
                  <Gravatar size={100} className="rounded-lg shadow-lg" email={auth.user.email} />
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-12 col-md-8">
                <h3>Ștergere cont</h3>
                <p>
                  <b>Atenție!</b> Această opțiune duce la ștergerea definitivă a contului tău.
                </p>
              </div>
              <div className="col-12 col-md-4">
                <button onClick={deletemyAccount} className="btn-custom-2 w-100 light-grey">
                  Ștergere cont <i className="fas fa-user-minus ml-2"></i>{" "}
                </button>
              </div>
            </div>
            {/* <form>
              <div className="row">
                <div className="col-lg-6 form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="col-lg-6 form-group">
                  <label>Repeat Password</label>
                  <input type="password" className="form-control" placeholder="Repeat Password" />
                </div>
                <div className="col-lg-12 form-group">
                  <label>Upload Your ID</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="propertyThumbnail" />
                    <label className="custom-file-label" htmlFor="propertyThumbnail">
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-custom">
                Save Changes
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
