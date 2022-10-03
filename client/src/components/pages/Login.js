import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Content from "../sections/login/Content";
import Footer from "../layouts/Footerthree";

class Login extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>🌮 Hungry Time | Intră în cont</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Login;
