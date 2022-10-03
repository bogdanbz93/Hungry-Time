import React, { Component, Fragment } from "react";
import Testimonials from "../home/Testimonials";
import About from "../hometwo/About";
import Counter from "./Counter";
import Gallery from "./Gallery";
import Video from "./Video";

class Content extends Component {
  render() {
    return (
      <Fragment>
        <About />
        <Counter />
        <Gallery />
        <Video />
        <Testimonials />
      </Fragment>
    );
  }
}

export default Content;
