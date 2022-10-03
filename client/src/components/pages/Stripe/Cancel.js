import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layouts/Headerfive";
import Footer from "../../layouts/Footerthree";
import Content from "../../sections/stripe/ContentError";

const Success = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>🌮 Hungry Time | Plată efectuată</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default Success;
