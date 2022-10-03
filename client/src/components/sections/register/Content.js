import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Notiflix from "notiflix-react";
import { register } from "../../../actions/auth";

const images = [
  { img: "assets/img/coming-soon/1.jpg", title: "De unde provine numele de 'restaurant'?", text: " Cuvantul „restaurant” vine din franceza. A fost prima data folosit pentru a descrie localurile care vindeau supa de oase de vita, un preparat care „restaura” sistemul imunitar." },
  { img: "assets/img/coming-soon/2.jpg", title: "Unde se află cel mai mare restaurant din lume?", text: "Cel mai mare restaurant din lume se afla in… Siria. Se numeste Bawabet Dimashq Restaurant, care se traduce prin Restaurantul Poarta Damascului." },
  { img: "assets/img/coming-soon/3.jpg", title: "Cel mai vechi restaurant activ din lume", text: "Cel mai vechi restaurant din Statele Unite se afla in Boston si se numeste The Union Oyster House. Functioneaza fara intrerupere inca din anul 1826." }
];

const Content = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    Notiflix.Loading.Circle("Te înregistrăm...");
    try {
      const res = await register({
        name,
        email,
        password
      });
      Notiflix.Loading.Remove();
      if (res)
        Notiflix.Report.Success("Înregistrare cu succes", `Bine ai venit în aplicația noastră, ${name}! Te rugăm să confirmi adresa de email pentru a continua.`, "Către login", function () {
          window.location.replace("/login");
        });
    } catch (err) {
      Notiflix.Loading.Remove();
      console.log(err);
      if (err.response.status === 400) Notiflix.Report.Failure("Înregistare eșuată", err.response.data, "Încearcă din nou");
    }
  };

  // Setari slider

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
              Creează-ți <u>primul tău cont</u> în câțiva pași simpli 👨🏼‍🍳
            </h3>
            <p>
              Descoperă toate beneficiile platformei creându-ți primul tău cont. <br />
              Avem o multitudine de restaurante și localuri care te așteaptă. <br />
              Ce mai aștepți?
            </p>
          </div>
          <div className="form-group">
            <label>Numele tău 🧑‍💻</label>
            <input type="text" className="form-control form-control-light" placeholder="ex. Bogdan" name="username" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Adresă de email 📧</label>
            <input type="email" className="form-control form-control-light" placeholder="ex. bogdan.buzea@gmail.com" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Parolă 🔑</label>
            <input type="password" className="form-control form-control-light" placeholder="Parola contului tău" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button disabled={!name || !email || !password} type="submit" className="btn-custom secondary btn-block">
            Înregistrează-mă
          </button>
          <div className="auth-seperator">
            <span>SAU ALEGE</span>
          </div>
          <div className="social-login">
            <div className="alert alert-light border rounded-lg" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-2 text-danger" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>{" "}
              Dacă optezi pentru conectarea prin <u>Google</u> și nu deții un cont, poți folosi link-ul de mai jos "<b>Către pagina de login</b>", ulterior apăsând pe butonul "<b>Conectează-te prin Google</b>".
              <Link to="/login">
                <button type="button" className="btn-custom-2 light-grey w-100 my-2">
                  Către pagina de login <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </Link>
            </div>
          </div>
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
