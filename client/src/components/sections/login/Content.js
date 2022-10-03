import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Notiflix from "notiflix-react";
import { login, googleLogin } from "../../../actions/auth";
import GoogleLogin from "react-google-login";

const images = [
  { img: "assets/img/coming-soon/1.jpg", title: "De unde provine numele de 'restaurant'?", text: " Cuvantul „restaurant” vine din franceza. A fost prima data folosit pentru a descrie localurile care vindeau supa de oase de vita, un preparat care „restaura” sistemul imunitar." },
  { img: "assets/img/coming-soon/2.jpg", title: "Unde se află cel mai mare restaurant din lume?", text: "Cel mai mare restaurant din lume se afla in… Siria. Se numeste Bawabet Dimashq Restaurant, care se traduce prin Restaurantul Poarta Damascului." },
  { img: "assets/img/coming-soon/3.jpg", title: "Cel mai vechi restaurant activ din lume", text: "Cel mai vechi restaurant din Statele Unite se afla in Boston si se numeste The Union Oyster House. Functioneaza fara intrerupere inca din anul 1826." }
];

const Content = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // If user redirected from logout

  Notiflix.Notify.Init({
    position: "right-bottom"
  });

  if (window.localStorage.getItem("confirmLogout")) {
    Notiflix.Notify.Info("Ai fost deconectat din aplicație.");
    window.localStorage.removeItem("confirmLogout");
  }

  if (window.localStorage.getItem("accessDenied")) {
    Notiflix.Report.Info("Înainte să continui.. ✋", localStorage.getItem("accessDenied"), "Okay, mă voi conecta");
    window.localStorage.removeItem("accessDenied");
  }

  // Submit function

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let res = await login({
        email,
        password
      });
      if (res.data) {
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data
        });

        Notiflix.Report.Success("Bine ai revenit!", `Te-ai logat cu succes în aplicație, ${res.data.user.name}! Te-am redirecționat automat pe prima pagină a aplicației.`);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) Notiflix.Report.Failure("Login eșuat", err.response.data, "Încearcă din nou");
    }
  };

  // Submit Google functions

  const responseSuccessGoogle = async response => {
    try {
      const email = response.profileObj.email;
      let res = await googleLogin({ tokenId: response.tokenId, email });
      response = { ...response, user: { _id: res.data.user._id, name: res.data.user.name, email: response.profileObj.email, createdAt: res.data.user.createdAt, updatedAt: res.data.user.updatedAt, stripe_account_id: res.data.user.stripe_account_id, stripe_seller: res.data.user.stripe_seller, stripeSession: res.data.user.stripeSession, booking: { date: "", hour: "", chairs: "", phone: "" } }, token: res.data.token }; // added user.email -> auth.user.email
      window.localStorage.setItem("auth", JSON.stringify(response));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: response
      });
      Notiflix.Report.Success("Bine ai revenit!", `Te-ai logat cu succes în aplicație, ${response.profileObj.name}! Te-am redirecționat automat pe prima pagină a aplicației.`);
    } catch (err) {
      console.log("Google Login error: ", err);
    }
  };

  const responseErrorGoogle = () => {};

  // Slider settings
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
    dotsClass: "d-flex slick-dots"
  };
  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form onSubmit={handleSubmit}>
          <div className="auth-text">
            <h3>
              Ești la <u>un pas distanță</u> de toate beneficiile platformei 🥪
            </h3>
            <p>
              Descoperă toate beneficiile platformei intrând în contul tău. <br />
              Avem o multitudine de restaurante și localuri care te așteaptă. <br />
              Ce mai aștepți?
            </p>
          </div>
          <div className="form-group">
            <label>Adresă de email 📧</label>
            <input type="email" className="form-control form-control-light" placeholder="Adresa ta de email" name="username" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Parolă 🔑</label>
            <input type="password" className="form-control form-control-light" placeholder="Parola contului tău" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button disabled={!email || !password} type="submit" className="btn-custom secondary btn-block">
            Intră în cont
          </button>
          <div className="auth-seperator">
            <span>SAU ALEGE</span>
          </div>
          <div className="social-login">
            <GoogleLogin className="w-100 googleLogin mb-3" clientId="162931479552-121fmku5b96cb6ghml0a3re4426eaord.apps.googleusercontent.com" buttonText="Conectează-te prin Google" onSuccess={responseSuccessGoogle} onFailure={responseErrorGoogle} cookiePolicy={"single_host_origin"} />
            <div className="alert alert-light border rounded-lg mt-3" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-2 text-danger" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>{" "}
              Dacă optezi pentru conectarea prin <u>Google</u> și nu deții un cont, poți apăsa direct pe "<b>Conectează-te prin Google</b>" și se va crea unul automat.
            </div>
          </div>
          <p className="text-center mb-0">
            Nu ai deja un cont creat în platformă? <Link to="/register">Creează acum unul</Link>{" "}
          </p>
        </form>
      </div>
      <div className="acr-auth-bg">
        <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
          {images.map((item, i) => (
            <div key={i}>
              <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }}>
                <div className="acr-auth-quote">
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Content;
