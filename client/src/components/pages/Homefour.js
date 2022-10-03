import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Footer from "../layouts/Footerthree";
import Content from "../sections/homefour/Content";

const Homefour = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>🌮 Hungry Time | Restaurantele tale preferate</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default Homefour;
