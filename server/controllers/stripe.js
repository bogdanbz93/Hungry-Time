import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";
import mongoose from "mongoose";
import Restaurant from "../models/restaurant";
import Order from "../models/order";
import nodemailer from "nodemailer";

mongoose.set("useFindAndModify", false);

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // Find user
  const user = await User.findById(req.user._id).exec();
  console.log("user ==> ", user);
  if (!user.stripe_account_id) {
    const account = await stripe.account.create({
      type: "express"
    });

    console.log("Account ===>", account);
    user.stripe_account_id = account.id;
    user.save();
  }

  // create login link based on id
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding"
  });

  // prefill any info such as email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined
  });

  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("login link : ", link);
  res.send(link);
};

const updateDelayDays = async accountId => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7
        }
      }
    }
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  // console.log("user account retrieve", account);
  //update delay days
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: account
    },
    { new: true }
  )
    .select("-password")
    .exec();
  console.log(updatedUser);
  res.send(updatedUser);
};

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id
    });
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id, {
      redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
    });
    console.log("login link for payout settings ==> ", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("Stripe payout settings error ==> ", err);
  }
};

export const stripeSessionId = async (req, res) => {
  // console.log("you hit the button stripe session id", req.body.restaurantId);
  const user = await User.findById(req.user._id).exec();
  const { restaurantId } = req.body;
  console.log(user);
  const item = await Restaurant.findById(restaurantId).populate("postedBy").exec();
  const fee = (item.price * 20) / 100;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: `Rezervare restaurant ${item.title}`,
        amount: item.price * 100,
        currency: "ron",
        quantity: 1
      }
    ],
    payment_intent_data: {
      application_fee_amount: fee * 100,
      transfer_data: {
        destination: item.postedBy.stripe_account_id
      }
    },
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item.id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL
  });

  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  res.send({
    sessionId: session.id
  });
};

export const stripeSuccess = async (req, res) => {
  try {
    const { restaurantId, bookingDate, bookingHour, bookingChairs, bookingPhone } = req.body;
    const emailRestaurant = await Restaurant.findById(restaurantId).select("email title").exec();
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "hungrytimero@hotmail.com",
        pass: "1qaz@WSX3edc"
      }
    });

    const options = {
      from: "hungrytimero@hotmail.com",
      to: emailRestaurant.email,
      subject: `${emailRestaurant.title} a primit o nouă rezervare pe Hungry Time`,
      html: `<!doctype html><html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Hungry Time</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; Margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; } /* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #fff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .footer { clear: both; padding-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; Margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #3498db; } .btn-primary a { background-color: #3498db; border-color: #3498db; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; Margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; }} @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class=""> <table border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <span class="preheader">O nouă rezervare în aplicație</span> <table class="main"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td> <h1>Hungry Time</h1> <h2>${emailRestaurant.title} a primit o nouă rezervare.</h2> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a href="http://localhost:3000/restaurant/orders/${restaurantId}" target="_blank">Verifică pagina</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p>Dacă ai primit acest email din greșeală, te rog să ne trimiți un email pentru a verifica situația ta.</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- START FOOTER --> <div class="footer"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Hungry Time - Aplicație web pentru restaurante</span> </td> </tr> </table> </div> <!-- END FOOTER --> <!-- END CENTERED WHITE CONTAINER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body></html>`
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
    //find currently logged in user
    const user = await User.findById(req.user._id).exec();
    if (user.stripeSession.id) {
    }
    //retrieve stripe session, based on session id we previously save in user db
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
    //if session payment status is paid, create order
    if (session.payment_status === "paid") {
      //check if order with that session id already exists by querying orders collection
      const orderExist = await Order.findOne({
        "session.id": session.id
      }).exec();
      if (orderExist) {
        //if order exists send success true response
        res.json({ success: true });
      } else {
        // else create new order and send success true
        let newOrder = await new Order({
          restaurant: restaurantId,
          date: bookingDate,
          hour: bookingHour,
          chairs: bookingChairs,
          phone: bookingPhone,
          session,
          orderedBy: user._id
        }).save();
        //remove user's stripeSession
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} }
        });
        res.json({ success: true });
      }
    }
  } catch (err) {
    console.log("stripe success err: ", err);
  }
};
