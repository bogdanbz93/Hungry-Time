import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Footer from "../layouts/Footerthree";
import Content from "../sections/error/Content";

class Error extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>🌮 Hungry Time | Pagină incorectă</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Error;
