import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/listinggrid/Content";

class Listinggrid extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>🌮 Hungry Time | Lista restaurantelor</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Lista restaurantelor 🧐" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Listinggrid;
