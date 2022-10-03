import React, { Component, Fragment } from "react";
import Banner from "./Banner";
import Bluecta from "../../layouts/Bluecta";
import Aboutus from "./Aboutus";
import Recentlisting from "./Recentlisting";
import Singleagent from "./Singleagent";
import Search from "./Search";
import Testimonials from "./Testimonials";
import Location from "./Location";

class Content extends Component {
  render() {
    return (
      <Fragment>
        <Banner />
        <div className="section pt-md-5 pt-0 pb-0 mt-5 px-3">
          <Bluecta />
        </div>
        <Recentlisting />
        <Location />
        <Search />
        <div className="section mt-5 mb-0 pb-0">
          <Aboutus />
        </div>
        <Singleagent />
        <Testimonials />
      </Fragment>
    );
  }
}

export default Content;
