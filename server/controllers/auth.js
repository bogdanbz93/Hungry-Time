import User from "../models/user";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import user from "../models/user";
import nodemailer from "nodemailer";

// API Client Id for Google login
const client = new OAuth2Client("162931479552-121fmku5b96cb6ghml0a3re4426eaord.apps.googleusercontent.com");

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    // Validation
    if (!name) return res.status(400).send("Numele tău nu este completat.");
    if (!password || password.length < 6) return res.status(400).send("Parola este necesară și trebuie să conțină minim 6 caractere.");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send("Email-ul există deja în baza de date.");
    }

    // Register
    const user = new User(req.body);
    await user.save();
    console.log("User-ul a fost creat.", user);
    let verifyUser = await User.findOne({ email }).exec();
    let token = jwt.sign({ _id: verifyUser._id }, process.env.JWT_SECRET);
    console.log("cu asta va fi trimis emailul: ========= ", token);
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "hungrytimero@hotmail.com",
        pass: "1qaz@WSX3edc"
      }
    });

    const options = {
      from: "hungrytimero@hotmail.com",
      to: email,
      subject: `Hungry Time - confirmă adresa de email`,
      html: `<!DOCTYPE html><html> <head> <meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Hungry Time</title> <style>/* ------------------------------------- GLOBAL RESETS ------------------------------------- */ img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%;}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;}table td{font-family: sans-serif; font-size: 14px; vertical-align: top;}/* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body{background-color: #f6f6f6; width: 100%;}/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container{display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px;}/* This should also be a block element, so that it will fill 100% of the .container */ .content{box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;}/* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main{background: #fff; border-radius: 3px; width: 100%;}.wrapper{box-sizing: border-box; padding: 20px;}.footer{clear: both; padding-top: 10px; text-align: center; width: 100%;}.footer td, .footer p, .footer span, .footer a{color: #999999; font-size: 12px; text-align: center;}/* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4{color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px;}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize;}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;}p li, ul li, ol li{list-style-position: inside; margin-left: 5px;}a{color: #3498db; text-decoration: underline;}/* ------------------------------------- BUTTONS ------------------------------------- */ .btn{box-sizing: border-box; width: 100%;}.btn > tbody > tr > td{padding-bottom: 15px;}.btn table{width: auto;}.btn table td{background-color: #ffffff; border-radius: 5px; text-align: center;}.btn a{background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize;}.btn-primary table td{background-color: #3498db;}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #ffffff;}/* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last{margin-bottom: 0;}.first{margin-top: 0;}.align-center{text-align: center;}.align-right{text-align: right;}.align-left{text-align: left;}.clear{clear: both;}.mt0{margin-top: 0;}.mb0{margin-bottom: 0;}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;}.powered-by a{text-decoration: none;}hr{border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0;}/* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px){table[class="body"] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class="body"] p, table[class="body"] ul, table[class="body"] ol, table[class="body"] td, table[class="body"] span, table[class="body"] a{font-size: 16px !important;}table[class="body"] .wrapper, table[class="body"] .article{padding: 10px !important;}table[class="body"] .content{padding: 0 !important;}table[class="body"] .container{padding: 0 !important; width: 100% !important;}table[class="body"] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class="body"] .btn table{width: 100% !important;}table[class="body"] .btn a{width: 100% !important;}table[class="body"] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}</style> </head> <body class=""> <table border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container"> <div class="content"> <span class="preheader">Verificare email din aplicație</span> <table class="main"> <tr> <td class="wrapper"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td> <h1>Hungry Time</h1> <h2>Te rugăm să apeși pe butonul de mai jos pentru a-ți confirma adresa de email.</h2> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td><a href="http://localhost:3000/confirmation/${token}" target="_blank">Verifică pagina</a></td></tr></tbody> </table> </td></tr></tbody> </table> <p>Dacă ai primit acest email din greșeală, te rog să ne trimiți un email pentru a verifica situația ta.</p></td></tr></table> </td></tr></table> <div class="footer"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"><span class="apple-link">Hungry Time - Aplicație web pentru restaurante</span></td></tr></table> </div></div></td><td>&nbsp;</td></tr></table> </body></html>`
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.log("Eroare la înregistrarea user-ului: ", err);
    return res.status(400).send("Se pare că a fost o eroare neașteptată, înregistrează-te din nou.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    console.log(user.confirmed);
    // console.log("user exists", user);
    if (!user || user.confirmed === false) res.status(400).send("Adresa de email nu există în baza noastră de date sau nu este confirmat. Așadar, va trebui să-l înregistrezi mai întâi sau să confirmi adresa de email.");
    // comparam parolele
    else {
      user.comparePassword(password, (err, match) => {
        console.log("Compare password in login err", err);
        if (err) return err;
        else {
          if (!match || err) return res.status(400).send("Parola contului tău este incorectă.");
          // console.log("generate a token then send as response to client");
          let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          });
          console.log(token);
          res.json({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              stripe_account_id: user.stripe_account_id,
              stripe_seller: user.stripe_seller,
              stripeSession: user.stripeSession,
              booking: {
                date: "",
                hour: "",
                chairs: "",
                phone: ""
              }
            }
          });
        }
      });
    }
  } catch (err) {
    console.log("Login error: ", err);
    res.status(400).send("Se pare că a fost o eroare neașteptată, loghează-te din nou.");
  }
};

export const googleLogin = async (req, res) => {
  const { tokenId, email } = req.body;
  console.log(email);
  client.verifyIdToken({ idToken: tokenId, audience: "162931479552-121fmku5b96cb6ghml0a3re4426eaord.apps.googleusercontent.com" }).then(response => {
    const { name, email_verified } = response.payload;
    if (email) {
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).send("Se pare că a fost o eroare la autentificarea prin Google.");
        } else {
          if (user) {
            // Daca exista deja (contul)
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d"
            });
            res.json({
              token,
              user: {
                _id: user._id,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession
              }
            });
          } else {
            let password = email + process.env.JWT_SECRET + "fmku5b96cb6ghml0a3re4426eaord";
            const user = new User({ name, email, password });
            try {
              user.save();
              console.log("User-ul a fost creat.", user);
              return res.json({ ok: true });
            } catch (err) {
              console.log("Eroare la înregistrarea user-ului: ", err);
              return res.status(400).send("Se pare că a fost o eroare neașteptată, înregistrează-te din nou.");
            }
          }
        }
      });
    } else {
      res.status(400).send("Email-ul nu este verificat. Incearca inregistrarea manual.");
    }
    console.log(response.payload);
  });
};

export const updateProfile = async (req, res) => {
  User.updateOne(
    {
      _id: req.body._id
    },
    { $set: { name: req.body.name } },
    { upsert: true }
  )
    .then(obj => {
      console.log("suc from update:", obj);
      res.json({ user: { name: user.name } });
    })
    .catch(err => {
      console.log("err from update", err);
    });
};

export const deleteAccount = async (req, res) => {
  User.findOneAndRemove({ _id: req.body._id }, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(400).send("Contul a fost sters.");
    }
  });
};

export const confirmAccount = async (req, res) => {
  console.log("aici e token ======", req.params.token);
  const { _id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
  User.updateOne(
    {
      _id: _id
    },
    { $set: { confirmed: true } },
    { upsert: true }
  )
    .then(suc => {
      console.log("Confirmation success:", suc);
      res.status(200).send("Contul a fost confirmat");
    })
    .catch(err => {
      console.log("err from confirm", err);
    });
};
