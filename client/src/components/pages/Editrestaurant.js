import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../layouts/Userbreadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/edit-restaurant/Content";

class Profilelistings extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>🌮 Hungry Time | Editează un restaurant</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Profilelistings;
