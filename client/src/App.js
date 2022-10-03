import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import { PrivateRoute, PrivateRouteInverse } from "./helper/PrivateRoute";
// Components
import StripeCallback from "./stripe/StripeCallback";

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Page
const Homefour = React.lazy(() => import("./components/pages/Homefour"));
// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
// Listings
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
const Listinglist = React.lazy(() => import("./components/pages/Listinglist"));
const Listingdetailstwo = React.lazy(() => import("./components/pages/Listingdetailstwo"));
const Listingdetailsthree = React.lazy(() => import("./components/pages/Listingdetailsthree"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));
const Editrestaurant = React.lazy(() => import("./components/pages/Editrestaurant"));
const Viewrestaurant = React.lazy(() => import("./components/pages/Viewrestaurant"));
const Stripesuccess = React.lazy(() => import("./components/pages/Stripe/Success.js"));
const Vieworders = React.lazy(() => import("./components/pages/Vieworders.js"));
const Stripecancel = React.lazy(() => import("./components/pages/Stripe/Cancel.js"));
const Confirmation = React.lazy(() => import("./components/pages/Confirmation.js"));
// Agents
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Profilelistings = React.lazy(() => import("./components/pages/Profilelistings"));
const Profilebookings = React.lazy(() => import("./components/pages/Profilebookings"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          {/* Homepages */}
          <Route exact path="/" component={Homefour} />
          {/* Pages */}
          <Route path="/about" component={About} />
          <PrivateRouteInverse exact path="/login" component={Login} />
          <PrivateRouteInverse exact path="/register" component={Register} />
          <Route path="/legal" component={Legal} />
          {/* Listings */}
          <Route path="/search-result" component={Listinggrid} />
          <Route path="/listing-list" component={Listinglist} />
          <Route path="/listing-details-v2" component={Listingdetailstwo} />
          <Route path="/listing-details-v3" component={Listingdetailsthree} />
          <PrivateRoute exact path="/submit-listing" component={Submitlisting} />
          <PrivateRoute exact path="/restaurant/edit/:restaurantId" component={Editrestaurant} />
          <PrivateRoute exact path="/restaurant/orders/:restaurantId" component={Vieworders} />
          <Route path="/restaurant/:restaurantId" component={Viewrestaurant} />
          <Route path="/confirmation/:token" component={Confirmation} />
          <PrivateRoute exact path="/stripe/success/:restaurantId" component={Stripesuccess} />
          <PrivateRoute exact path="/stripe/cancel" component={Stripecancel} />
          {/* Agents */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
          <PrivateRoute exact path="/profile-listings" component={Profilelistings} />
          <PrivateRoute exact path="/profile-bookings" component={Profilebookings} />
          <Route path="*" exact={true} component={Error} />
        </Switch>
      </Suspense>
      <CookieConsent location="bottom" buttonText="Am înțeles" cookieName="hungryCookie" style={{ background: "#2B373B" }} buttonStyle={{ color: "#000", borderRadius: "8px", fontSize: "16px" }} expires={150}>
        <i className="fas fa-cookie-bite mr-2"></i> Pentru afișarea de conținut personalizat, folosim module cookie sau tehnologii similare. Navigând pe acest website, ești de acord să permiți colectarea de informații.
      </CookieConsent>
    </Router>
  );
}

export default App;
