import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Footer from "../layouts/Footerthree";
import Content from "../sections/listing-details-v1/Content";

class Listingdetailsone extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>🌮 Hungry Time | Vizionezi un restaurant</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Listingdetailsone;
