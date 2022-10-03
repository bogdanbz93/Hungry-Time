import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../layouts/Userbreadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/profile/Content";

const Profile = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>🌮 Hungry Time | Contul meu</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumb />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default Profile;
